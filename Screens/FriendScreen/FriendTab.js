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

const FriendTab = (prop) => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state)
    // console.log("FriendTab", JSON.stringify(store, 0, 2))
    const token = store.user.user.token
    // console.log("Prop in person tab", JSON.stringify(prop, 0, 2))
    const user = prop.children
    const [profileIMGURI, setProfileIMGURI] = useState("")
    useEffect(() => {
        getAvatar()
    }, [])
    const getAvatar = async () => {
        try {
            // console.log("friendtabavatar", JSON.stringify(user, 0, 2))
            const coverRes = await DocumentAPI.get(user.avatar._id)
            setProfileIMGURI(fileURL + coverRes.data.data.fileName)
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnFriend = async () => {
        try {
            const data = { user_id: user._id }
            // console.log("datainf", data)
            const res = await friendApi.unFriend(data, token)
            // console.log("handleUnFriend", JSON.stringify(res.data, 0, 2))
            setIsHandled(false)
        } catch (error) {
            console.log(error)
        }
    }

    const [isHandled, setIsHandled] = useState(true)

    return (
        <View>
        {
          isHandled &&  
            <View style={{ flexDirection: "row" }}>
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
                            onPress={handleUnFriend}>
                            <View style={{ backgroundColor: "#7DA0EF", height: 39, justifyContent: "center" }}>
                                {/* <Button title="Thêm bạn bè">
                                </Button> */}
                                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 17 }}>
                                    Hủy kết bạn
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>}
        </View>
    )
}

export default FriendTab