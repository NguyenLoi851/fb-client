import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from "expo-status-bar";
import FacebookBannerImage from "../../assets/imgs/facebook-banner.jpg";
import { navigation } from "../../rootNavigation";
import { loginApi } from '../../apis/Auth/loginApi';
import { useDispatch } from 'react-redux';
import { addUser, setSocket } from '../../store/user';
import { Icon, Input } from "react-native-elements";
import { grey1 } from '../../common/color';
import { chatBaseUrl } from '../../common/baseUrl';

const HomeScreen = () => {
    const dispatch = useDispatch()
    const [phonenumber, setPhonenumber] = useState("")
    const [password, setPassword] = useState("")
    const [hidePassword, setHidePassword] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errLogin, setErrLogin] = useState("")
    // const [socket, setSocket] = useState(null)

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
                // console.log("homescreenres", JSON.stringify(res.data, 0, 2))
                navigation.navigate("facebook")
                setErrLogin("")
                const { io } = require("socket.io-client");
                const socket = io(chatBaseUrl, {
                    transportOptions: {
                        polling: {
                            extraHeaders: {
                                token: res.data.token,
                            },
                        },
                    },
                });
                // console.log("socket", socket)
                // console.log("homescreensocket", JSON.stringify(socket, Realm.JsonSerializationReplacer))
                dispatch(setSocket(socket));
            }
        } catch (error) {
            setErrLogin("S??? ??i???n tho???i ho???c m???t kh???u kh??ng ????ng")
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
                        style={[styles.input, styles.inputUsername, { marginBottom: 10, marginLeft: 10, marginRight: 38 }]}
                        placeholder="Nh???p s??? ??i???n tho???i ho???c email"
                        placeholderTextColor={grey1}
                        value={phonenumber}
                        onChangeText={(text) => { setPhonenumber(text), setErrLogin("") }}
                        keyboardType="numeric"
                    />

                    {/* <TextInput
                        style={[styles.input, styles.inputPassword]}
                        secureTextEntry={true}
                        placeholder="Nh???p m???t kh???u"
                        placeholderTextColor="#cdcdcf"
                        value={password}
                        onChangeText={(text)=>setPassword(text)}
                    /> */}
                    <View style={styles.form_item}>
                        <Input
                            // style={[styles.input, styles.inputPassword]}
                            style={[styles.input, styles.inputUsername, {}]}
                            placeholder="M???t kh???u"
                            value={password}
                            // errorMessage={errPassword}
                            placeholderTextColor={grey1}
                            onChangeText={(text) => { setPassword(text), setErrLogin("") }}
                            rightIcon={checkHidePass()}
                            secureTextEntry={hidePassword}
                        ></Input>
                    </View>

                    <Text style={{ color: "red", fontSize: 16, textAlign: "center", margin: 10 }}>{errLogin}</Text>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={handleLogin}>????ng nh???p</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.link}>
                        <Text style={styles.linkText}>Qu??n m???t kh???u?</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.footer}>
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>Ho???c</Text>
                        <View style={styles.dividerLine} />
                    </View>


                    <TouchableOpacity style={[styles.button, styles.buttonRegister]}

                        // NOTE 
                        onPress={() => navigation.navigate('create-account')}>
                        {/* onPress={() => navigation.navigate('phone-password')}> */}

                        <Text style={[styles.buttonText, styles.buttonRegisterText]}>
                            ????ng k?? t??i kho???n m???i
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
        borderBottomWidth: 1,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    // inputPassword: {
    //     borderBottomLeftRadius: 3,
    //     borderBottomRightRadius: 3,
    // },
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

