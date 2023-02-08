import {
    StyleSheet,
    Text,
    View,
    FlatList,
    LogBox,
    SafeAreaView,
    TouchableOpacity,
    RefreshControl,
} from "react-native";

const PostComment = (prop) => {
    console.log("prop in comment", JSON.stringify(prop, 0, 2))
    const user = prop.children.user
    const username = user.username
    const avatar = user.avatar
    const content = prop.children.content

    return (
        <View style={{ marginBottom: 30 }}>
            <View style={{ flexDirection: "row" }}>
                <View >
                    <Text>
                        Avatar
                    </Text>
                </View>
                <View style={{ marginLeft: 20, width: 200 }}>
                    <View style={{ backgroundColor: "#ECE1DE", }}>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                {username}
                            </Text>
                        </View>
                        <View>
                            <Text>
                                {content}
                            </Text>
                        </View>
                    </View>

                    <View>
                        <Text>
                                Like      Comment
                        </Text>
                    </View>
                </View>
            </View>


        </View>
    )
}

export default PostComment

const styles = StyleSheet.create({

})