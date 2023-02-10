import { StyleSheet, Text, View, ScrollView, SafeAreaView, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import PersonTab from "./PersonTab";
import { UserAPI } from "../../apis/User/UserAPI";

const NotFriendList = () => {
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
      getAllUsers()
    }, [])
    
    const getAllUsers = async() => {
      try {
        const res = await UserAPI.list()
        console.log("all users", JSON.stringify(res.data, 0, 2))
        setAllUsers(res.data.data)
      } catch (error) {
        console.log(error)
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
            lineHeight: 40,
            textAlign: "center"
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