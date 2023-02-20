import { useState, useEffect } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { useSelector } from "react-redux"
import { UserAPI } from "../../apis/User/UserAPI"
import { fileURL } from "../../common/baseUrl"
import { Icon } from "react-native-elements";

const MesssageContent = (prop) => {
    const store = useSelector((state) => state)
    // console.log("messagecontent", JSON.stringify(store.user.user, 0, 2))
    const userId = store.user.user.data.id
    // console.log("messagecontentprop", JSON.stringify(prop.prop, 0, 2))
    const token = store.user.user.token
    const [avatarUrl, setAvatarUrl] = useState("")

    useEffect(() => {
        getAvatar();
    }, [])

    const getAvatar = async () => {
        try {
            const res = await UserAPI.showByUserId(token, prop.prop.senderId)
            // console.log("resavatar", JSON.stringify(res.data, 0, 2))
            setAvatarUrl(fileURL + res.data.data.avatar.fileName)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            {prop.prop.senderId == userId ?
                <>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                        <View>
                            <Text style={[styles.texts]}>
                                {prop.prop.content == "likeicon123likeicon" ? <Icon name="thumbs-up" type="font-awesome" style={{marginBottom:10}}></Icon> : prop.prop.content}
                            </Text>
                        </View>
                        <View>
                            <Image
                                source={{ uri: avatarUrl }}
                                style={[styles.images]}
                            ></Image>
                        </View>
                    </View>
                </> :
                <>
                    <View style={{ flexDirection: "row" }}>
                        <View>
                            <Image
                                source={{ uri: avatarUrl }}
                                style={[styles.images]}
                            ></Image>
                        </View>
                        <View>
                            <Text style={[styles.texts]}>
                                {prop.prop.content == "likeicon123likeicon" ? <Icon name="thumbs-up" type="font-awesome" style={{ marginTop: 10 }}></Icon> : prop.prop.content}
                            </Text>
                        </View>
                    </View>
                </>}
        </View>
    )
}

export default MesssageContent

const styles = StyleSheet.create({
    images: {
        width: 30,
        height: 30,
        borderRadius: 100,
        marginRight: 10,
        margin: 10
    },
    texts: {
        fontSize: 16,
        margin: 10
    }
})