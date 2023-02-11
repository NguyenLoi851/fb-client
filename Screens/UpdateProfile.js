import { View, Text, TouchableOpacity, Image, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fileURL } from "../common/baseUrl";
import { DocumentAPI } from "../apis/Documents/DocumentAPI";
import { navigation } from "../rootNavigation";
import * as ImagePicker from "expo-image-picker";
import { UserAPI } from "../apis/User/UserAPI";
import * as FileSystem from "expo-file-system";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
const MAX_VIDEO_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_DURATION = 10;
const MIN_VIDEO_DURATION = 1;
const UpdateProfile = () => {

  const store = useSelector((state) => state);
  console.log("storeinhere", JSON.stringify(store, 0, 2))
  const [coverIMGURI, setCoverIMGURI] = useState("")
  const [profileIMGURI, setProfileIMGURI] = useState("")

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    console.log(JSON.stringify(store, 0, 2))

    var user = store.user.user.data

    const coverID = user.cover_image
    const profileID = user.avatar
    try {
      const coverRes = await DocumentAPI.get(coverID)
      const profileRes = await DocumentAPI.get(profileID)

      setCoverIMGURI(fileURL + coverRes.data.data.fileName)
      setProfileIMGURI(fileURL + profileRes.data.data.fileName)
    } catch (error) {
      console.log(error)
    }
  }

  const [image, setImage] = useState([]);


  const handleAddImage = () => {
    if (image.length < 4) uploadImage(1);
    else alert("chỉ dược up tối đa 4 ảnh");
  };

  const handleAddImage2 = () => {
    if (image.length < 4) uploadImage(2);
    else alert("chỉ dược up tối đa 4 ảnh");
  };

  const permissionRequest = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(" k có quyền truy cập!!!");
      return false;
    } else return true;
  };

  const uploadImage = async (option) => {
    await permissionRequest();

    if (permissionRequest()) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
        allowsMultipleSelection: false,
        // selectionLimit: 4,
      });


      if (!result.cancelled) {
        const fruits = [];
        fruits.push(result.assets[0])
        setImage(fruits);

        requestSend(option)
      }
    }
  };


  const requestSend = async (option) => {

    let images = [];
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
    }

    const onSend = (progressEvent) => {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(percentCompleted);
    };

    // await upPostApi.createPost(
    //   token,
    //   postText,
    //   images,
    //   videos,
    //   onSend
    // )
    //   .then((res) => {
    //     console.log(res.data);
    //     console.log(res.status);
    //     // context.setNeedUpdateProfile(true);
    //     // context.setNeedUpdateTimeline(true);
    //     Alert.alert("Thành công", "Đã đăng bài xong, kéo xuống để tải lại trang", [{ text: "OK" }]);
    //     return;
    //   })
    //   .catch((e) => {
    //     // console.log(e.response.status);
    //     // console.log(e.response);
    //     console.log(e)
    //   });
    // navigation.goBack();
    if (option == 1) {
      try {
        const data = { avatar: images[0] }
        const res = await UserAPI.edit(data, store.user.user.token)
        console.log("hoho", JSON.stringify(res.data, 0, 2))
        setProfileIMGURI(fileURL + res.data.data.avatar.fileName)
        // setCoverIMGURI(fileURL+res.data.data.cover_image.fileName)
      } catch (error) {
        console.log("hoho", error)
      }
    } else {
      try {
        const data = { cover_image: images[0] }
        const res = await UserAPI.edit(data, store.user.user.token)
        console.log("hoho", JSON.stringify(res.data, 0, 2))
        // setProfileIMGURI(fileURL + res.data.data.avatar.fileName)
        setCoverIMGURI(fileURL+res.data.data.cover_image.fileName)
      } catch (error) {
        console.log("hoho", error)
      }
    }

  }


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setProfileIMGURI(profileIMGURI)
    setCoverIMGURI(coverIMGURI)
    setTimeout(async () => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing}
        onRefresh={onRefresh} />
    }
    // horizontal={false}
    // style={{ display: "flex", flexDirection: "column" }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        <View
          style={{
            paddingTop: 40,
            paddingHorizontal: 15,
            paddingBottom: 15,
            borderBottomColor: "#bababa",
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Chỉnh sửa trang cá nhân
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 15,
          }}
        >
          <View
            style={{
              paddingVertical: 15,
              borderBottomColor: "#bababa",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 18,
                }}
              >
                Ảnh đại diện
              </Text>
              <TouchableOpacity
                onPress={handleAddImage}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "#3982E4",
                  }}
                >
                  Chỉnh sửa
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Image
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 150,
                }}
                source={{
                  uri: profileIMGURI,
                }}
              ></Image>
            </View>
          </View>
          <View
            style={{
              paddingVertical: 15,
              borderBottomColor: "#bababa",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 18,
                }}
              >
                Ảnh bìa
              </Text>
              <TouchableOpacity
                onPress={handleAddImage2}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "#3982E4",
                  }}
                >
                  Chỉnh sửa
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 15,
              }}
            >
              <Image
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 8,
                }}
                source={{
                  uri: coverIMGURI,
                }}
              ></Image>
            </View>
          </View>
          <View
            style={{
              paddingVertical: 15,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 18,
                }}
              >
                Thông tin cá nhân
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("changeAvatar")
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "#3982E4",
                  }}
                >
                  Chỉnh sửa
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 15,
              }}
            >
              <View
                style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}
              >
                <Text style={{ fontSize: 16, width: 100, fontWeight: "600" }}>
                  Tên hiển thị:
                </Text>
                <Text style={{ fontSize: 16 }}>{store.user.user.data.username}</Text>
              </View>
              <View
                style={{ display: "flex", flexDirection: "row", marginBottom: 5 }}
              >
                <Text style={{ fontSize: 16, width: 100, fontWeight: "600" }}>
                  Giới tính:
                </Text>
                <Text style={{ fontSize: 16 }}>Nam</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text style={{ fontSize: 16, width: 100, fontWeight: "600" }}>
                  Ngày sinh:
                </Text>
                <Text style={{ fontSize: 16 }}>01/01/2001</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateProfile;
