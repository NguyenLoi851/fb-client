import { useEffect, useState } from "react";
import { View, Text } from "react-native"
import { useSelector } from "react-redux";
import { friendApi } from "../../apis/Friends/FriendApi";
import { Icon, Input } from "react-native-elements";
import MessageItem from "./MessageItem";

const MessageList = () => {
    const [friends, setFriends] = useState([])
    const store = useSelector((state) => state);
    const token = store.user.user.token;
    useEffect(() => {
        getFriends()
    }, [])
    const getFriends = async () => {
        try {
            const res = await friendApi.getListFriends(token)
            console.log("myfriendmessenger", JSON.stringify(res.data, 0, 2))
            setFriends(res.data.data.friends)
        } catch (error) {
            console.log("myfriend", error)
        }
    }
    return (
        <View>
            <View style={{ margin: 15, flexDirection: "row" }}>
                <View style={{marginTop: 10}}>
                    <Icon name="search-circle-outline" type='ionicon'></Icon>
                </View>
                <Input
                    placeholder="Tìm kiếm">
                </Input>
            </View>
            {
                friends.length > 0 &&
                friends.map(item => <MessageItem key={item}>{item}</MessageItem>)
            }
        </View>
    )
}

export default MessageList