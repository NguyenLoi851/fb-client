import {
    StyleSheet,
    Text,
    View,
    FlatList,
    LogBox,
    SafeAreaView,
    TouchableOpacity,
    RefreshControl,
    Button
} from "react-native";

const PersonTab = (prop) => {
    return (
        <View style={{flexDirection:"row"}}>
            <View style={{margin: 10}}>
                <Text >
                    Avatar
                </Text>
            </View>

            <View>
                <View style={{margin: 10}}>
                    <Text style={{fontWeight: "bold"}}>
                        Name
                    </Text>
                </View>

                <View style={{ flexDirection: "row" }}>
                    <View>
                        <TouchableOpacity>
                            <View>
                                <Button title="Thêm bạn bè">
                                </Button>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginLeft: 10 }}>
                        <TouchableOpacity>
                            <View>
                                <Button title="Gỡ" color="#D9CECA">
                                </Button>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>


        </View>
    )
}

export default PersonTab