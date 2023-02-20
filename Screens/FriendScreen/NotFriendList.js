import { StyleSheet, Text, View, ScrollView, SafeAreaView, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import PersonTab from "./PersonTab";
import { UserAPI } from "../../apis/User/UserAPI";
import { friendApi } from "../../apis/Friends/FriendApi";
import { useSelector } from "react-redux";
import RequestTab from "./RequestTab";
import { blockApi } from "../../apis/Block/blockApi";

const NotFriendList = () => {
  const [allUsers, setAllUsers] = useState([])
  const [requestFriends, setRequestFriends] = useState([])
  const store = useSelector((state)=>state)
  const token = store.user.user.token

  useEffect(() => {
    getAllUsers()
    getRequestFriends()
    // getListBlockMe()
  }, [])

  const getListBlockMe = async()=>{
    try {
      const res = await blockApi.getListBlockMe(token)
      // console.log("blockme", JSON.stringify(res.data, 0, 2))
      return res.data.data
    } catch (error) {
      console.log(error)
    }
  }

  const getAllUsers = async () => {
    try {
      // const res = await UserAPI.list()
      const res = await friendApi.getListNot(token)
      // console.log("all users in not list", JSON.stringify(res.data, 0, 2))
      const allListNot = res.data.data.friends
      const listBlockMe = await getListBlockMe()
      // console.log("listBlockMe", listBlockMe)
      const listBlockMe2 = listBlockMe.map(item=>item.sender)
      const rs = allListNot.filter(item => !listBlockMe2.includes(item._id))
      // console.log("rs", rs)
      setAllUsers(rs)
    } catch (error) {
      console.log("all users in not list",error)
    }
  }

  const getRequestFriends = async()=>{
    try {
      // console.log("HelloFriend", token)
      const res = await friendApi.getRequestFriend(token)
      // console.log("requestFriend",JSON.stringify(res.data.data.friends,0,2))
      setRequestFriends(res.data.data.friends)
    } catch (error) {
      console.log("requestFriend",error)
    }
  }

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async() => {
    setRefreshing(true);
    setAllUsers([])
    setRequestFriends([])
    await getAllUsers()
    await getRequestFriends()
    setTimeout(async () => {
      setRefreshing(false);
    }, 1000);
  };
  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing}
        onRefresh={onRefresh} />
    }
    >
    <View>
      <View>
        <Text
          style={{
            // fontFamily: 'FACEBOLF',
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            margin: 10,
            lineHeight: 40
          }}
        >
          Lời mời kết bạn {requestFriends.length}
        </Text>
      </View>
      <View>
        {
          requestFriends.length > 0 &&
          requestFriends.map(item => <RequestTab key={item}>{item}</RequestTab>)
        }
      </View>
      <View>
        <Text
          style={{
            // fontFamily: 'FACEBOLF',
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            margin: 10,
            lineHeight: 40
          }}
        >
          Những người bạn có thể biết
        </Text>
      </View>
      <View>
        {
          allUsers.length > 0 &&
          allUsers.map(item => <PersonTab key={item}>{item}</PersonTab>)
        }
      </View>
    </View>
    </ScrollView>

  )
}

export default NotFriendList