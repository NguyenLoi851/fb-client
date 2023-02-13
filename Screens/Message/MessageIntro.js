import { TouchableOpacity } from "react-native-gesture-handler"
import { View, Text, Image } from "react-native"
import MessengerLogo from "../../assets/imgs/messenger-logo.png"
import { navigation } from "../../rootNavigation"

const MessageIntro = () => {
    return (
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 200 }}>
            <Image source={MessengerLogo}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    marginRight: 20

                }} />
            <TouchableOpacity style={{margin: 50}} onPress={()=>navigation.navigate("messenger")}>
                <View style={{backgroundColor: "#749EF1", alignItems:"center", borderRadius: 10}}>
                    <Text style={{margin: 10}}>
                        Tham gia trò chuyện

                    </Text>
                    <Text style={{margin: 10}}>
                        cùng bạn bè
                    </Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}
export default MessageIntro