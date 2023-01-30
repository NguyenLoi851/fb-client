import React, { useState } from "react";
import { Button, View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { navigation } from '../../rootNavigation';

const ConfirmScreen = () => {
    const store = useSelector((state) => state)
    // console.log(JSON.stringify(store,0,2))
    const [verifyCode, setVerifyCode] = useState("")
    const handleVerify = () => {
        if(verifyCode == "686868"){
            navigation.navigate("login")
        }
        else{
            navigation.navigate("login")
        }
    }
    return (
        <View>

            <View style={{ marginTop: 50 }}>
                <Text style={{ textAlign: "center" }}> Chúng tôi đã gửi SMS kèm mã tới
                    <Text style={{ fontWeight: "bold" }}> {store.user.register.phone}  </Text>
                </Text>

                <Text style={{ fontWeight: "bold", textAlign: "center" }}>Nhập mã gồm 5 chữ số từ SMS của bạn.</Text>

            </View>

            <View style={styles.content}>

                {/* <View>
                    <Text> FB-</Text>
                    <TextInput
                        style={[styles.input, styles.inputPassword]}
                        // secureTextEntry={true}
                        placeholder="Mã xác thực (686868)"
                        placeholderTextColor="#cdcdcf"
                        value={verifyCode}
                        onChangeText={(text)=> setVerifyCode(text)}
                    />
                </View> */}
                <Text>
                    FB-
                    <View>
                    <TextInput
                        style={[styles.input, {marginLeft: 10, width: 150}]}
                        secureTextEntry={true}
                        placeholder="Mã xác thực (686868)"
                        placeholderTextColor="#cdcdcf"
                        value={verifyCode}
                        onChangeText={(text)=> setVerifyCode(text)}
                    />
                    </View>

                </Text>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={handleVerify}>Xác nhận</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    height: 42,
                    borderRadius: 6,
                    backgroundColor: "#e5e6eb",
                    justifyContent: "center",
                    marginVertical: 15,
                }}
                >
                    <Text style={{
                        textAlign: "center",
                        fontSize: 16,
                    }}>Tôi không nhận được mã</Text>
                </TouchableOpacity>

            </View>

            <Text style={{ textAlign: "center" }}>Đăng xuất </Text>

        </View>
    )
}

export default ConfirmScreen;

const styles = StyleSheet.create({
    banner: {
        resizeMode: "contain",
        width: "100%",
        height: null,
        aspectRatio: 750 / 460, // Image ratio
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
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