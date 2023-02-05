import React, { Component, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import FriendSearch from './FriendSearch'
// import FriendSearch from './FriendSearch'
// import FriendRequestList from './FriendRequestList'

const FriendScreen = () => {
  console.log('FriendScreen is rendering !!!!')

  return (
    <SafeAreaView>
      <ScrollView>
        {/* <FriendSearch navigation={navigation} />
        <FriendRequestList /> */}
        {/* <FriendSearch/> */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default FriendScreen