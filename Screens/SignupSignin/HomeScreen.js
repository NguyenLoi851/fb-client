import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from "expo-status-bar";
import FacebookBannerImage from "../../assets/imgs/facebook-banner.jpg";
import { navigation } from "../../rootNavigation";
import { loginApi } from '../../apis/Auth/loginApi';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/user';
import { Icon, Input } from "react-native-elements";

const HomeScreen = () => {
    const dispatch = useDispatch()
    const [phonenumber, setPhonenumber] = useState("")
    const [password, setPassword] = useState("")
    const [hidePassword, setHidePassword] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState("")

    const checkHidePass = () => {
        return hidePassword ? (
            <Icon
                style={styles.icon}
                name="eye-off-outline"
                type="ionicon"
                color="#919194"
                onPress={() => setHidePassword(!hidePassword)}
            ></Icon>
        ) : (
            <Icon
                style={styles.icon}
                name="eye-outline"
                type="ionicon"
                color="#919194"
                onPress={() => setHidePassword(!hidePassword)}
            ></Icon>
        );
    };

    const handleLogin = async () => {
        const data = {
            phonenumber,
            password
        }
        try {
            const res = await loginApi.login(data)
            if (res.data) {
                dispatch(addUser(res.data))
                navigation.navigate("facebook")
            }
        } catch (error) {
            console.log(error)
        }
        // navigation.navigate("facebook")
    }
    return (
        <>
            <StatusBar style="light" />

            {/* https://reactnative.dev/docs/image */}
            <Image source={FacebookBannerImage} style={styles.banner} />

            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <TextInput
                        style={[styles.input, styles.inputUsername]}
                        placeholder="Nhập số điện thoại hoặc email"
                        placeholderTextColor="#cdcdcf"
                        value={phonenumber}
                        onChangeText={(text) => setPhonenumber(text)}
                        keyboardType="numeric"
                    />

                    {/* <TextInput
                        style={[styles.input, styles.inputPassword]}
                        secureTextEntry={true}
                        placeholder="Nhập mật khẩu"
                        placeholderTextColor="#cdcdcf"
                        value={password}
                        onChangeText={(text)=>setPassword(text)}
                    /> */}
                    <View style={styles.form_item}>
                        <Input
                            style={[styles.input, styles.inputPassword]}
                            placeholder="Mật khẩu"
                            value={password}
                            // errorMessage={errPassword}
                            onChangeText={(text) => setPassword(text)}
                            rightIcon={checkHidePass()}
                            secureTextEntry={hidePassword}
                        ></Input>
                    </View>


                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={handleLogin}>Đăng nhập</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.link}>
                        <Text style={styles.linkText}>Quên mật khẩu?</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.footer}>
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>Hoặc</Text>
                        <View style={styles.dividerLine} />
                    </View>


                    <TouchableOpacity style={[styles.button, styles.buttonRegister]}

                        // NOTE 
                        onPress={() => navigation.navigate('create-account')}>
                        {/* onPress={() => navigation.navigate('phone-password')}> */}

                        <Text style={[styles.buttonText, styles.buttonRegisterText]}>
                            Đăng ký tài khoản mới
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}

export default HomeScreen;

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

