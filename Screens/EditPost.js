import {
    StyleSheet,
    Text,
    View,
    TextInput,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    Alert
} from "react-native";
import React from "react";
import { Icon, Image } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import { upPostApi } from "../apis/Post/upPostApi";
import { useSelector } from "react-redux";
import DefaultAvatar from "../assets/imgs/default_avatar.png"
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { navigation } from "../rootNavigation";
import { DocumentAPI } from "../apis/Documents/DocumentAPI";
import { fileURL } from "../common/baseUrl";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
const MAX_VIDEO_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_DURATION = 10;
const MIN_VIDEO_DURATION = 1;
const EditPost = () => {
    const store = useSelector((state) => state)
    console.log("editpost", JSON.stringify(store, 0, 2))
    const token = store.user.user.token;
    const [content, setContent] = useState(null);
    const [image, setImage] = useState([]);
    const [video, setVideo] = useState(null);
    const windowWidth = Dimensions.get("window").width;
    const [profileIMGURI, setProfileIMGURI] = useState("")
    const avatarId = store.user.user.data.avatar
    const postId = store.user.post

    useEffect(() => {
        getAvatar()
        getPostToEdit()
    }, [])

    const getPostToEdit = async () => {
        try {
            const res = await upPostApi.show(token, postId)
            console.log("editpostres", JSON.stringify(res.data, 0, 2))
            setContent(res.data.data.described)
            setPostText(res.data.data.described)
            setImage(res.data.data.images.map(item => ({ ...item, uri: fileURL + item.fileName })))
            // image
        } catch (error) {
            console.log(error)
        }
    }
    const getAvatar = async () => {
        try {
            const coverRes = await DocumentAPI.get(avatarId)
            setProfileIMGURI(fileURL + coverRes.data.data.fileName)
        } catch (error) {
            console.log(error)
        }

    }
    const permissionRequest = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert(" k có quyền truy cập!!!");
            return false;
        } else return true;
    };
    const uploadImage = async () => {
        await permissionRequest();

        if (permissionRequest()) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: "Images",
                allowsMultipleSelection: false,
                // selectionLimit: 4,
            });

            console.log("CLGT")
            console.log(result);
            console.log("CLGT")
            if (!result.cancelled) {
                const fruits = [];

                fruits.push(result.assets[0])
                setImage(fruits);
            }
            // if (result.selected) {
            //   result.selected.map((item) => {
            //     setImage([...image, item]);
            //   });
            // } else {
            //   setImage([...image, result]);
            // }
        }
    };
    const handleAddImage = () => {
        if (image.length < 4) uploadImage();
        else alert("chỉ dược up tối đa 4 ảnh");
    };
    const handleUploadVideo = async () => {
        await permissionRequest();
        if (permissionRequest()) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: "Videos",
            });
            console.log(result);
            setVideo(result);
        }
    };
    const handleSubmit = async () => {
        const data = new FormData();
        const data2 = {}
        data.append("described", content);
        data2.described = content
        for (let i = 0; i < image.length; i++) {
            const upload_body = {
                uri: image[i]["uri"],
                type: `image/${image[i]["uri"].slice(-4) === "jpeg" ? "jpg" : "png"}`,
                name:
                    Platform.OS === "ios"
                        ? image[i]["filename"]
                        : `my_profile${Date.now()}.${image[i]["uri"].slice(-4) === "jpeg" ? "jpg" : "png"
                        }`,
            };
            data.append("images", upload_body);
            data2.images = [upload_body]
        }
        try {
            if (video["uri"]) {
                data.append("videos", {
                    uri: video["uri"],
                    type: "video/mp4",
                    name:
                        Platform.OS === "ios"
                            ? image[i]["filename"]
                            : `my_profile${Date.now()}.mp4`,
                });
                data2.videos = [{
                    uri: video["uri"],
                    type: "video/mp4",
                    name:
                        Platform.OS === "ios"
                            ? image[i]["filename"]
                            : `my_profile${Date.now()}.mp4`,
                }]
            }
        } catch (error) {
            console.log(error)
        }

        try {
            console.log(data)
            console.log(data2)
            const res = await upPostApi.post(data2, token)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
        // const res = upPostApi.post(data);
        // res
        //   .then((res) => {
        //     console.log("asdad", res.data);
        //   })
        //   .catch((err) => console.log("err", err));
    };

    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================
    // =======================================================================================================

    const [postText, setPostText] = useState("");
    const [isSent, setIsSent] = useState(false);

    // const [openSelect, setOpenSelect] = useState(route.params?route.params.mode:"image");
    const [selectedImage, setSelectedImage] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [inputIsFocus, setInputIsFocus] = useState(false);

    const checkCanSend = () => {
        return postText !== "" || selectedVideo != null || selectedImage.length > 0;
    };
    const onChangeText = (text) => {
        setPostText(text);
    };
    const exitScreen = () => {
        if (checkCanSend()) {
            Alert.alert("Xác nhận", "Nội dung chưa được lưu bạn có chắc muốn hủy?", [
                { text: "Không" },
                { text: 'Có', onPress: () => { navigation.goBack() } }
            ])
        } else {
            navigation.goBack()
        }
    };
    const removeImage = (i) => {
        let images = Array.from(selectedImage);
        images.splice(i, 1);
        setSelectedImage(images);
    };
    const canOpenVideo = () => {
        if (selectedImage.length > 0) return false;
        return true;
    };

    const requestSend = async () => {
        console.log("isSent", isSent)
        if (!isSent) {
            setIsSent(true);
            if (postText.length > 500) {
                Alert.alert(
                    "Bài viết quá dài",
                    "Chỉ cho phép bài viết tối đa 500 ký tự",
                    [{ text: "OK" }]
                );
                return;
            }
            let images = [];
            console.log(image.length)
            for (let i = 0; i < image.length; i++) {
                var thisImage = image[i];
                var uri = thisImage.uri;
                // let info = await MediaLibrary.getAssetInfoAsync(selectedImage[i]);
                let fileInfo = await FileSystem.getInfoAsync(uri);
                if (fileInfo.size > MAX_IMAGE_SIZE) {
                    Alert.alert("Ảnh quá lớn", "Chỉ cho phép ảnh kích thước tối đa 4MB", [
                        { text: "OK" },
                    ]);
                    return;
                }
                let base64 = await FileSystem.readAsStringAsync(uri, {
                    encoding: "base64",
                });
                images.push("data:image;base64," + base64);
                console.log(base64.length / 1024 / 1024);
            }

            //    for (let i = 0; i < selectedImage.length; i++) {
            //   let info = await MediaLibrary.getAssetInfoAsync(selectedImage[i]);
            //   let fileInfo = await FileSystem.getInfoAsync(info.localUri);
            //   if (fileInfo.size > MAX_IMAGE_SIZE) {
            //     Alert.alert("Ảnh quá lớn", "Chỉ cho phép ảnh kích thước tối đa 4MB", [
            //       { text: "OK" },
            //     ]);
            //     return;
            //   }
            //   let base64 = await FileSystem.readAsStringAsync(info.localUri, {
            //     encoding: "base64",
            //   });
            //   images.push("data:image;base64," + base64);
            //   console.log(base64.length / 1024 / 1024);
            // }

            let videos = [];

            if (selectedVideo != null) {
                let info = await MediaLibrary.getAssetInfoAsync(selectedVideo);
                let fileInfo = await FileSystem.getInfoAsync(info.localUri);
                if (fileInfo.size > MAX_VIDEO_SIZE) {
                    Alert.alert(
                        "Video quá lớn",
                        "Chỉ cho phép video kích thước tối đa 10MB",
                        [{ text: "OK" }]
                    );
                    return;
                }
                if (info.duration > MAX_VIDEO_DURATION) {
                    Alert.alert(
                        "Video quá dài",
                        "Chỉ cho phép video có độ dài tối đa 10s",
                        [{ text: "OK" }]
                    );
                    return;
                }
                if (info.duration < MIN_VIDEO_DURATION) {
                    Alert.alert("Video quá ngắn", "Video cần tối thiểu 1s", [
                        { text: "OK" },
                    ]);
                    return;
                }

                let video = await FileSystem.readAsStringAsync(info.localUri, {
                    encoding: "base64",
                });
                videos.push("data:video;base64," + video);
                console.log(videos[0].length);
            }

            const onSend = (progressEvent) => {
                var percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                console.log(percentCompleted);
            };

            await upPostApi.editPost(
                token,
                postText,
                images,
                videos,
                onSend,
                postId
            )
                .then((res) => {
                    console.log(res.data);
                    console.log(res.status);
                    console.log("taday")
                    // context.setNeedUpdateProfile(true);
                    // context.setNeedUpdateTimeline(true);
                    Alert.alert("Thành công", "Đã cập nhật bài xong, kéo xuống để tải lại trang", [{ text: "OK" }]);
                    return;
                })
                .catch((e) => {
                    console.log("taiday")

                    // console.log(e.response.status);
                    // console.log(e.response);
                    console.log(e)
                });
            navigation.goBack();
        }
    };

    return (
        <View
            style={{
                flex: 1,
                width: windowWidth,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingTop: 40,
                    paddingBottom: 10,
                    borderBottomColor: "#aaa",
                    borderBottomWidth: 1,
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "600",
                    }}
                >
                    Chỉnh sửa bài viết
                </Text>
                <TouchableOpacity
                    // onPress={handleSubmit}
                    onPress={requestSend}
                    style={{
                        width: 60,
                        height: 30,
                        backgroundColor: "#0742e6",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 8,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            color: "#fff",
                            fontWeight: "500",
                        }}
                    >
                        Cập nhật
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 10, paddingTop: 15 }}>
                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    {/* <Image
              // source={{
              //   uri: "https://source.unsplash.com/random?sig=10",
              // }}
              source={DefaultAvatar}
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                marginRight: 10,
              }}
            ></Image> */}
                    {
                        profileIMGURI != "" ?
                            <Image
                                source={{ uri: profileIMGURI }}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 100,
                                    marginRight: 10,
                                }}
                            ></Image> :

                            <Image
                                source={
                                    //   {
                                    //   // uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU",
                                    //   uri: "../assets/imgs/default_avatar.png"
                                    // }
                                    DefaultAvatar
                                }
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 100,
                                    marginRight: 10,
                                }}
                            ></Image>

                    }
                    <Text style={{ fontSize: 15 }}>{store.user.user.data.username}</Text>
                </View>
                <View>
                    <TextInput
                        value={content}
                        onChangeText={(text) => { 
                            setContent(text)
                            setPostText(text)}}
                        placeholder="Bạn đang nghĩ gì..."
                        multiline={true}
                        style={{ padding: 15, fontSize: 20 }}
                    ></TextInput>
                </View>
                {image[0] ? (
                    <SafeAreaView style={{ minHeight: 380, maxHeight: 570 }}>
                        <FlatList
                            data={image}
                            // style={}
                            numColumns={2}
                            keyExtractor={(e) => e}
                            renderItem={({ item }) => (
                                <Image
                                    source={{ uri: item.uri }}
                                    containerStyle={{
                                        aspectRatio: 1,
                                        width: "100%",
                                        height: 150,
                                        flex: 1,
                                    }}
                                />
                            )}
                        ></FlatList>
                    </SafeAreaView>
                ) : (
                    <></>
                )}
            </View>
            <View
                style={{
                    marginTop: "auto",
                    paddingVertical: 10,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderTopWidth: 1,
                    borderTopColor: "#aaa",
                }}
            >
                <TouchableOpacity
                    style={{
                        width: "25%",
                        alignItems: "center",
                    }}
                    onPress={handleAddImage}
                >
                    <Icon type="ionicon" name="images" color={"#58C472"}></Icon>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: "25%",
                        alignItems: "center",
                    }}
                    onPress={handleUploadVideo}
                >
                    <Icon type="ionicon" name="videocam" color={"#F23E5C"}></Icon>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: "25%",
                        alignItems: "center",
                    }}
                    onPress={handleUploadVideo}
                >
                    <Icon type="material" name="mood" color={"#F8C03E"}></Icon>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditPost;