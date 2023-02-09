import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    LogBox,
    SafeAreaView,
    TouchableOpacity,
    RefreshControl,
    Image,
} from "react-native";
import { DocumentAPI } from "../apis/Documents/DocumentAPI";
import { fileURL } from "../common/baseUrl";
import DefaultAvatar from "../assets/imgs/default_avatar.png"

const PostComment = (prop) => {
    console.log("prop in comment", JSON.stringify(prop, 0, 2))
    const user = prop.children.user
    const username = user.username
    const avatar = user.avatar
    const content = prop.children.content
    const [profileIMGURI, setProfileIMGURI] = useState("")
    useEffect(() => {
        getAvatar()
    }, [])

    const getAvatar = async () => {
        try {
            console.log("avatar in comment", avatar)
            const coverRes = await DocumentAPI.get(avatar._id)
            setProfileIMGURI(fileURL + coverRes.data.data.fileName)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <View style={{ marginBottom: 30 }}>
            <View style={{ flexDirection: "row" }}>
                <View >
                    {/* <Text>
                        Avatar
                    </Text> */}
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
                <View style={{ marginLeft: 20, width: 200 }}>
                    <View style={{ backgroundColor: "#ECE1DE", }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                {username}
                            </Text>
                        </View>
                        <View>
                            <Text>
                                {content}
                            </Text>
                        </View>
                    </View>

                    <View>
                        <Text>
                            Like      Comment
                        </Text>
                    </View>
                </View>
            </View>


        </View>
    )
}

export default PostComment

const styles = StyleSheet.create({

})