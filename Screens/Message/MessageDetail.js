import { View, Text, Dimensions, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { Icon } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { fileURL } from "../../common/baseUrl";
import React, { useState, useEffect } from "react";
import { messageApi } from "../../apis/Message/messageApi";
import MesssageContent from "./MessageContent";
import { navigation } from "../../rootNavigation";

const MessageDetail = () => {
    const windowWidth = Dimensions.get("window").width;
    const store = useSelector((state) => state)
    const receiver = store.user.otherMessageUser
    // console.log("userstore", JSON.stringify(store.user.user, 0, 2))
    // console.log("receiver", JSON.stringify(receiver, 0, 2))
    const [newMessage, setNewMessage] = useState("")
    const socket = store.user.socket
    const token = store.user.user.token
    const [chatId, setChatId] = useState(null)
    const [chatHistory, setChatHistory] = useState([])

    useEffect(() => {
        getChatHistory()
        socket.on("message", getChatHistory)
        return () => {
            socket.removeListener("message", getChatHistory)
        }
    }, [])


    const getChatHistory = async () => {
        try {
            const res = await messageApi.getMessagesByFriendId(token, receiver._id)
            // console.log("resmessage", JSON.stringify(res.data, 0, 2))
            setChatId(res.data.data.chatId)
            setChatHistory(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSendMessage = async () => {
        let likeMessage = ""
        if(newMessage==""){
            likeMessage = "likeicon123likeicon"
        }
        const data = {
            token: store.user.user.token,
            chatId: chatId == null ? null : chatId,
            receiverId: receiver._id,
            content: likeMessage == "" ? newMessage : likeMessage
        }
        // console.log("data ", data)
        socket.emit("chatmessage", data)
        chatHistory.push({
            senderId: store.user.user.data.id,
            content: likeMessage != "" ? likeMessage  : newMessage
        })
        setNewMessage("")
    }

    return (
        <View style={{
            flex: 1,
            marginTop: 20,
            width: windowWidth,
        }}>
                <View style={{ flexDirection: "row", marginTop: 20, flex: 1 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon type="ionicon" name="arrow-back-outline" style={{ marginRight: 20, marginLeft: 20, marginTop: 3 }} />
                    </TouchableOpacity>

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
            {/* <ScrollView> */}
                <View>
                    {
                        chatHistory.length == 0 &&
                        <View style={{ alignItems: "center" }}>
                            <View>
                                <Image
                                    source={{ uri: fileURL + receiver.avatar.fileName }}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 100,
                                        marginRight: 10,
                                    }}
                                ></Image>
                            </View>
                            <View>
                                <Text style={{ fontSize: 30, margin: 10 }}>
                                    {receiver.username}
                                </Text>
                            </View>
                            <View>
                                <Text style={{ margin: 20, fontSize: 20, marginBottom: 80 }}>
                                    Các bạn là bạn bè trên Facebook
                                </Text>
                            </View>
                        </View>
                    }
                </View>
                <View>
                    {
                        chatHistory.length > 0 &&
                        chatHistory.map((item) => <MesssageContent key={item} prop={item}></MesssageContent>)
                    }
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
                        newMessage == "" ?
                            <TouchableOpacity onPress={handleSendMessage}>
                                <Icon name="thumbs-up" type="font-awesome" style={{ marginTop: 10 }}></Icon>
                            </TouchableOpacity> :
                            <>
                                <TouchableOpacity onPress={handleSendMessage}>
                                    <Icon name="send-outline" type="ionicon" style={{ marginTop: 10 }}></Icon>
                                </TouchableOpacity>
                            </>
                    }
                </View>
            {/* </ScrollView> */}

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