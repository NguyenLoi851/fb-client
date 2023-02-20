import { StyleSheet, TouchableOpacity, Text, View, ScrollView, SafeAreaView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { friendApi } from "../apis/Friends/FriendApi";
import PersonTab from "./FriendScreen/PersonTab";
import FriendTab from "./FriendScreen/FriendTab";
import { Icon, Input } from "react-native-elements";
import { blockApi } from "../apis/Block/blockApi";

const AllFriendProfile = () => {
    const [friends, setFriends] = useState([])
    const store = useSelector((state) => state);
    const token = store.user.user.token;
    useEffect(() => {
        getFriends()
    }, [])

    const getListBlockMe = async () => {
        try {
            const res = await blockApi.getListBlockMe(token)
            // console.log("blockme", JSON.stringify(res.data, 0, 2))
            return res.data.data
        } catch (error) {
            console.log(error)
        }
    }

    const getFriends = async () => {
        try {
            const res = await friendApi.getListFriends(token)
            // console.log("myfriend", JSON.stringify(res.data, 0, 2))
            const allFriends = res.data.data.friends
            const listBlockMe = await getListBlockMe()
            const listBlockMe2 = listBlockMe.map(item => item.sender)
            const rs = allFriends.filter(item => !listBlockMe2.includes(item._id))
            setFriends(rs)
        } catch (error) {
            console.log("myfriend", error)
        }
    }
    return (
        <View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
                <TouchableOpacity
                    style={[styles.button, { width: '30%' }]}
                >
                    <Text style={styles.button_text}>
                        Tất cả
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { width: '30%' }]}
                >
                    <Text style={styles.button_text}>
                        Gần đây
                    </Text>
                </TouchableOpacity>

            </View>
            <View style={{ margin: 15 }}>
                <Input
                    placeholder="Tìm kiếm bạn bè">
                </Input>
            </View>
            {
                friends.length > 0 &&
                friends.map(item => <FriendTab key={item}>{item}</FriendTab>)
            }

        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '15%',
        height: 40,
        borderRadius: 40,
        backgroundColor: '#d2d2d6',
        alignSelf: 'flex-start',
        marginLeft: 20,
        justifyContent: 'center',
    },
    button_text: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        // fontFamily: 'FACEBOLF',
    },
})

export default AllFriendProfile