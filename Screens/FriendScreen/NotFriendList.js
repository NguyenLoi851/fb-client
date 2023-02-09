import { StyleSheet, Text, View, ScrollView, SafeAreaView, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import PersonTab from "./PersonTab";

const NotFriendList = () => {

    const [people, setPeople] = useState([2,3,4])

    // const getPeople = async() => {
    // }
    return (
        <View>
            <View>
                <Text>
                    Những người bạn có thể biết
                </Text>
            </View>
            <View>
                {
                    people.length > 0 &&
                    people.map(item => <PersonTab key={item}>{item}</PersonTab>)
                }
            </View>
        </View>
    )
}

export default NotFriendList