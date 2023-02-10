import { StyleSheet, Text, View, ScrollView, SafeAreaView, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { Icon, Input } from "react-native-elements";

const AllFriend = () => {
    return(
        <View>
            <View>
                <Input 
                placeholder="Tìm kiếm bạn bè">
                </Input>
            </View>
            <View>
                <Text>
                    260 bạn bè
                </Text>
                
            </View>
        </View>
    )
}

export default AllFriend