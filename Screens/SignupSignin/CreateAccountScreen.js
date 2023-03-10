import * as React from 'react';
import { Button, View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';
import { navigation } from "../../rootNavigation"

const CreateAccountScreen = () => {
    return (
        <View style={styles.container}>
            <View>
                <Image
                source={require("../../assets/imgs/join_fb.png")}
                style={{ width: "100%", height: 300, marginTop: 30 }}
                ></Image>
            </View>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tham gia Facebook</Text>
            <Text style={{ textAlign: "center", fontSize: 17 }}>Chúng tôi sẽ giúp bạn tạo tài khoản sau vài bước dễ dàng</Text>
            

            <TouchableOpacity
                    style={[styles.button, { width: 300 }]}
                    onPress={() => navigation.navigate('name')}
                >
                    <Text style={styles.buttonText}>Tiếp</Text>
                </TouchableOpacity>
            </View>        

        </View>
    );
}

export default CreateAccountScreen;

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
      },

    banner: {
        resizeMode: "contain",
        width: "100%",
        height: null,
        aspectRatio: 750 / 460, // Image ratio
    },
    content: {
        padding: 22,
    },
    input: {
        borderWidth: 1,
        borderColor: "#cdcdcf",
        color: "#333333",
        fontSize: 16,
        height: 44,
        paddingHorizontal: 15,
    },
    inputUsername: {
        borderBottomWidth: 0,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    inputPassword: {
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
    },
    button: {
        height: 42,
        borderRadius: 6,
        backgroundColor: "#1977f3",
        justifyContent: "center",
        marginVertical: 15,
    },
    buttonText: {
        color: "#b4cafb",
        textAlign: "center",
        fontSize: 16,
    },
    link: {
        paddingVertical: 8,
    },
    linkText: {
        color: "#1c6ede",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "500",
    },
    footer: {
        alignItems: "center",
        padding: 22,
        paddingBottom: 0,
    },
    divider: {
        flexDirection: "row",
        alignItems: "center",
        width: "70%",
        marginBottom: 10,
    },
    dividerLine: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: "#cbccd0",
    },
    dividerText: {
        width: 50,
        textAlign: "center",
    },
    buttonRegister: {
        width: "100%",
        backgroundColor: "#e7f3ff",
    },
    buttonRegisterText: {
        color: "#1077f7",
    },
});