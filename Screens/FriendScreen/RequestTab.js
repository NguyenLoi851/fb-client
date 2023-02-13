import {
    StyleSheet,
    Text,
    View,
    FlatList,
    LogBox,
    SafeAreaView,
    TouchableOpacity,
    RefreshControl,
    Button,
    Image
} from "react-native";
import React, { useState, useEffect } from "react";
import { DocumentAPI } from "../../apis/Documents/DocumentAPI";
import { fileURL } from "../../common/baseUrl";
import DefaultAvatar from "../../assets/imgs/default_avatar.png"
import { friendApi } from "../../apis/Friends/FriendApi";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUser } from "../../store/user";
import { navigation } from "../../rootNavigation";

const RequestTab = (prop) => {
    const [isHandle, setIsHandle] = useState(false)
    const store = useSelector((state) => state)
    console.log("RequestTab", JSON.stringify(store, 0, 2))
    const token = store.user.user.token
    console.log("Prop in request tab", JSON.stringify(prop, 0, 2))
    const user = prop.children
    const [profileIMGURI, setProfileIMGURI] = useState("")
    useEffect(() => {
        getAvatar()
    }, [])
    const getAvatar = async () => {
        try {
            const coverRes = await DocumentAPI.get(user.avatar._id)
            setProfileIMGURI(fileURL + coverRes.data.data.fileName)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAcceptFriend = async () => {
        try {
            const data = { user_id: user._id, is_accept: 1 }
            console.log("datainf", data)
            const res = await friendApi.acceptFriend(data, token)
            console.log("handleAcceptFriend", JSON.stringify(res.data, 0, 2))
            setIsHandle(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleNotAcceptFriend = async () => {
        try {
            const data = { user_id: user._id, is_accept: 2 }
            console.log("datainf", data)
            const res = await friendApi.notAcceptFriend(data, token)
            console.log("handleNotAcceptFriend", JSON.stringify(res.data, 0, 2))
            setIsHandle(true)
        } catch (error) {
            console.log(error)
        }
    }
    const dispatch = useDispatch()
    return (
        <View style={{ flexDirection: "row" }}>
            {isHandle == true
                ? <></>
                : <>
                <TouchableOpacity onPress={()=>{
                    dispatch(setOtherUser(user))
                    navigation.navigate("other-profile")
                }}>
                    <View style={{ margin: 10 }}>
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
                    </View>
                </TouchableOpacity>
                    

                    <View>
                        <View style={{ margin: 10 }}>
                            <Text style={{ fontWeight: "bold" }}>
                                {user.username}
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row" }}>
                            <View style={{ width: 125 }}>
                                <TouchableOpacity
                                    onPress={handleAcceptFriend}>
                                    <View style={{ backgroundColor: "#7DA0EF", height: 39, justifyContent: "center" }}>
                                        {/* <Button title="Thêm bạn bè">
                                </Button> */}
                                        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 17 }}>
                                            Chấp nhận
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginLeft: 10, width: 125 }}>
                                <TouchableOpacity onPress={handleNotAcceptFriend}>
                                    <View style={{ backgroundColor: "#E2E5EB", height: 39, justifyContent: "center" }}>
                                        {/* <Button title="Gỡ" color="#D9CECA">
                                </Button> */}
                                        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 17 }}>
                                            Xóa
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </>}
        </View>
    )
}

export default RequestTab