import {View, Text, Dimensions} from "react-native"

const MessageDetail = () => {
  const windowWidth = Dimensions.get("window").width;

    return(
        <View style={{
            flex: 1,
            marginTop: 20,
            width: windowWidth,
        }}>
            <Text>
                Hello Realtime
            </Text>
        </View>
    )
}

export default MessageDetail