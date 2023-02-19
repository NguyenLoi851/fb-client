import { View, Text, Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native"
import { Icon } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { fileURL } from "../../common/baseUrl";
import React, { useState } from "react";

const MessageDetail = () => {
    const windowWidth = Dimensions.get("window").width;
    const store = useSelector((state) => state)
    const receiver = store.user.otherMessageUser
    // console.log("receiver", JSON.stringify(receiver, 0, 2))
    const [newMessage, setNewMessage] = useState("")
    const socket = store.user.socket

    const handleSendMessage = async() => {
        const data = {
            token: store.user.user.token,
            chatId: null,
            receiverId: receiver._id,
            content: newMessage
        }
        // console.log("data ", data)
        socket.emit("chatmessage", data)
        setNewMessage("")
    }

    return (
        <View style={{
            flex: 1,
            marginTop: 20,
            width: windowWidth,
        }}>
            <View style={{ flexDirection: "row", marginTop: 20, flex: 1}}>
                <Icon type="ionicon" name="arrow-back-outline" style={{ marginRight: 20, marginLeft: 20, marginTop: 3 }} />

                <View>
                    <Image
                        source={{ uri: fileURL + receiver.avatar.fileName }}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 100,
                            marginRight: 10,
                        }}
                    ></Image>
                </View>
                <View>
                    <Text>
                        {receiver.username}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", position: "absolute", right: 20 }}>
                    <Icon type="ionicon" name="call-outline" style={{ marginHorizontal: 10 }} />
                    <Icon type="ionicon" name="videocam-outline" style={{ marginHorizontal: 5 }} />
                    <Icon type="ionicon" name="information-circle-outline" style={{ marginHorizontal: 5 }} />
                </View>
            </View>

            <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Icon type="ionicon" name="ellipsis-horizontal-outline" style={{ marginHorizontal: 5 }} />
                    <Icon type="ionicon" name="camera-outline" style={{ marginHorizontal: 5 }} />
                    <Icon type="ionicon" name="image-outline" style={{ marginHorizontal: 5 }} />
                    <Icon type="ionicon" name="mic-outline" style={{ marginHorizontal: 5 }} />
                </View>
                <TextInput
                    placeholder="Tin nhắn"
                    value={newMessage}
                    style={[styles.input, { marginRight: 10 }]}
                    onChangeText={(text) => { setNewMessage(text) }}
                >

                </TextInput>
                {
                    newMessage == "" ? <Icon name="thumbs-up" type="font-awesome" style={{ marginTop: 10 }}></Icon> :
                        <>
                            <TouchableOpacity onPress={handleSendMessage}>

                                <Icon name="send-outline" type="ionicon" style={{ marginTop: 10 }}></Icon>
                            </TouchableOpacity>
                        </>
                }
            </View>
        </View>
    )
}

export default MessageDetail

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#cdcdcf",
        color: "#333333",
        fontSize: 16,
        height: 44,
        paddingHorizontal: 15,
        width: 180,
        borderRadius: 10
    },
})