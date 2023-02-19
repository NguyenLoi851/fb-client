import { useDispatch, useSelector } from "react-redux"
import { View, Text, Image } from "react-native"
import { fileURL } from "../../common/baseUrl"
import { useEffect, useState } from "react"
import { DocumentAPI } from "../../apis/Documents/DocumentAPI"
import DefaultAvatar from "../../assets/imgs/default_avatar.png"
import { TouchableOpacity } from "react-native-gesture-handler"
import { navigation } from "../../rootNavigation"
import { setOtherMessageUser } from "../../store/user"

const MessageItem = (prop) => {
    const store = useSelector((state) => state)
    const token = store.user.user.token
    const user = prop.children
    // console.log("messageitem", JSON.stringify(user, 0, 2))
    const [profileIMGURI, setProfileIMGURI] = useState("")
    const dispatch = useDispatch()
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
    return(
        <TouchableOpacity
        onPress={()=>{
            dispatch(setOtherMessageUser(user))
            navigation.navigate("message-detail")
            }}>
            <View style={{ flexDirection: "row", borderStyle:"solid", borderWidth: 1, borderRadius: 10, marginBottom: 5}}>
            <View style={{marginLeft: 15, marginRight: 10, marginBottom: 20, marginTop: 15}}>
            {
                    profileIMGURI != "" ?
                        <Image
                            source={{ uri: profileIMGURI }}
                            style={{
                                width: 60,
                                height: 60,
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
            <View>
            <View style={{ margin: 10, marginTop: 20}}>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                        {user.username}
                    </Text>
                </View>
            </View>

        </View>
        </TouchableOpacity>
        
    )
}

export default MessageItem