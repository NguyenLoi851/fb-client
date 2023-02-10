import React, { Component, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import { UserAPI } from '../../apis/User/UserAPI'
import FriendSearch from './FriendSearch'
import NotFriendList from './NotFriendList'
// import FriendSearch from './FriendSearch'
// import FriendRequestList from './FriendRequestList'

const FriendScreen = () => {
  console.log('FriendScreen is rendering !!!!')

  return (
    <SafeAreaView>
      <ScrollView>
        {/* <FriendSearch navigation={navigation} />
        <FriendRequestList /> */}
        <FriendSearch/>
        <NotFriendList/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default FriendScreen