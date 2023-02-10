import { StyleSheet, Text, View, ScrollView, SafeAreaView, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import PersonTab from "./PersonTab";
import { UserAPI } from "../../apis/User/UserAPI";
import { friendApi } from "../../apis/Friends/FriendApi";
import { useSelector } from "react-redux";
import RequestTab from "./RequestTab";

const NotFriendList = () => {
  const [allUsers, setAllUsers] = useState([])
  const [requestFriends, setRequestFriends] = useState([])
  const store = useSelector((state)=>state)
  const token = store.user.user.token

  useEffect(() => {
    getAllUsers()
    getRequestFriends()
  }, [])

  const getAllUsers = async () => {
    try {
      const res = await UserAPI.list()
      console.log("all users", JSON.stringify(res.data, 0, 2))
      setAllUsers(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getRequestFriends = async()=>{
    try {
      console.log("HelloFriend", token)
      const res = await friendApi.getRequestFriend(token)
      console.log("requestFriend",JSON.stringify(res.data.data.friends,0,2))
      setRequestFriends(res.data.data.friends)
    } catch (error) {
      console.log("requestFriend",error)
    }
  }

  return (
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
  )
}

export default NotFriendList