import React, { useState, useEffect } from 'react'
import { View, Text, Button, ScrollView, RefreshControl } from 'react-native'
// import { FriendDataTest } from '../../../../assets/FriendDataTest'
// import FriendChoiceItem from 'modules/components/FriendChoiceItem'
// import { getPreference } from 'libs/storage/PreferenceStorage'
// import { serverDomain, PreferenceKeys } from 'general/constants/Global'
const FriendRequestList = () => {
  useEffect(() => {
    getData()
  }, [])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getData()
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  const [refreshing, setRefreshing] = useState()

  const [data, setData] = useState([])
  const getRequestedFriendList = async (token, index, count) => {
    try {
      const response = await fetch(
        serverDomain + 'friend/get_requested_friends',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            token,
            index,
            count,
          }),
        },
      )

      const data = await response.json()
      if (data) {
        console.log('get_requested_friend')
        console.log(data)
        console.log(data.data.request)
        setData(data.data.request)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getData = async () => {
    try {
    //   const token = await getPreference('UserToken')
    //   if (token !== null) {
    //     getRequestedFriendList(token, 0, 10)
    //   }
    } catch (e) {
      // error reading value
    }
  }
  return (
    <ScrollView
      horizontal={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text
        style={{
          fontFamily: 'FACEBOLF',
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
          marginLeft: 20,
          lineHeight: 40,
          height: 100,
        }}
      >
        Lời mời kết bạn
      </Text>

      {data.map((item) => (
        <FriendChoiceItem
          isRequested={true}
          user_id={item.id}
          first_button="Chấp nhận"
          second_button="Xoá"
          key={item.id}
          avt={item.avatar}
          name={item.username}
          firstTaskName="trở thành bạn bè với"
          secondTaskName="xóa lời mời kết bạn của"
          firstTaskResponse="Các bạn đã trở thành bạn bè"
          secondTaskResponse="Đã xóa"
        />
      ))}
    </ScrollView>
  )
}

export default FriendRequestList