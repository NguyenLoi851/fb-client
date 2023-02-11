import React, { Component, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text, RefreshControl } from 'react-native'
import { UserAPI } from '../../apis/User/UserAPI'
import FriendSearch from './FriendSearch'
import NotFriendList from './NotFriendList'
// import FriendSearch from './FriendSearch'
// import FriendRequestList from './FriendRequestList'

const FriendScreen = () => {
  console.log('FriendScreen is rendering !!!!')
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async() => {
    setRefreshing(true);
    setTimeout(async () => {
      setRefreshing(false);
    }, 1000);
  };
  return (
    <SafeAreaView>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing}
          onRefresh={onRefresh} />
      }
      >
        {/* <FriendSearch navigation={navigation} />
        <FriendRequestList /> */}
        <FriendSearch />
        <NotFriendList />
      </ScrollView>
    </SafeAreaView>
  )
}

export default FriendScreen