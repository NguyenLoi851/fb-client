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
import { navigation } from "../../rootNavigation";
import { setOtherUser } from "../../store/user";

const PersonTab = (prop) => {

    const store = useSelector((state) => state)
    // console.log("PersonTab", JSON.stringify(store, 0, 2))
    const token = store.user.user.token
    // console.log("Prop in person tab", JSON.stringify(prop, 0, 2))
    const user = prop.children
    const [profileIMGURI, setProfileIMGURI] = useState("")

    const [isHandleAddFriend, setIsHandleAddFriend] = useState(false)
    const [isRemove, setIsRemove] = useState(false)

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

    const handleAddFriend = async () => {
        try {
            const data = { user_id: user._id }
            // console.log("datainf", data)
            const res = await friendApi.addFriend(data, token)
            // console.log("handleAddFriend", JSON.stringify(res.data, 0, 2))
            setIsHandleAddFriend(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancelRequest = async () => {
        try {
            const data = { user_id: user._id }
            const res = await friendApi.cancelRequest(data, token)
            setIsHandleAddFriend(false)
        } catch (error) {
            console.log(error)
        }
    }
    const dispatch = useDispatch()
    return (
        <View>
            {
                isRemove ? <></> : <View style={{ flexDirection: "row" }}>
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
                    

                    {
                        isHandleAddFriend ?
                            <View>
                                <View style={{ margin: 10 }}>
                                    <Text style={{ fontWeight: "bold" }}>
                                        {user.username}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: 125 }}>
                                        <TouchableOpacity
                                            onPress={handleCancelRequest}>
                                            <View style={{ backgroundColor: "#7DA0EF", height: 39, justifyContent: "center" }}>
                                                {/* <Button title="Thêm bạn bè">
                                </Button> */}
                                                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 17 }}>
                                                    Hủy lời mời
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View> :
                            <View>
                                <View style={{ margin: 10 }}>
                                    <Text style={{ fontWeight: "bold" }}>
                                        {user.username}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ width: 125 }}>
                                        <TouchableOpacity
                                            onPress={handleAddFriend}>
                                            <View style={{ backgroundColor: "#7DA0EF", height: 39, justifyContent: "center" }}>
                                                {/* <Button title="Thêm bạn bè">
                                </Button> */}
                                                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 17 }}>
                                                    Thêm bạn bè
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ marginLeft: 10, width: 125 }}>
                                        <TouchableOpacity onPress={() => setIsRemove(true)}>
                                            <View style={{ backgroundColor: "#E2E5EB", height: 39, justifyContent: "center" }}>
                                                {/* <Button title="Gỡ" color="#D9CECA">
                                </Button> */}
                                                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 17 }}>
                                                    Gỡ
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                    }

                </View>}
        </View>
    )
}

export default PersonTab