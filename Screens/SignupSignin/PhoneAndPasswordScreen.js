import React, { useState } from "react";
import { Button, View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { signupApi } from "../../apis/Auth/signupApi";
import { navigation } from "../../rootNavigation"
import { addPhone, addphone } from "../../store/user";
import { Icon, Input } from "react-native-elements";

const PhoneAndPasswordScreen = () => {
    const dispatch = useDispatch()
    const store = useSelector((state) => state)
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [hidePassword, setHidePassword] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errPass, setErrPass] = useState("")

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
    const handleAddPhoneAndPassword = async () => {
        if (password != confirmPassword) {
            setErrPass("Mật khẩu xác nhận không đúng")
            return;
        } else {
            setErrPass("")
        }
        try {
            const data = {
                username: store.user.register.name,
                birthday: store.user.register.date,
                email: store.user.register.email,
                phonenumber: phone,
                password: password,
                uuid: uuid()
            }

            try {
                const res = await signupApi.post(data);
                dispatch(addPhone(phone))
                navigation.navigate('confirm')
            } catch (error) {
                console.log(error)
            }

        } catch (error) {
            console.log(error)
        }

    }

    // setActiveSignup(true);
    //   const name = firstName + " " + lastName;
    //   const data = {
    //     phonenumber: phoneNumber,
    //     username: name,
    //     // name: name,
    //     password: password,
    //     uuid: uuid()
    //   };
    //   // console.log(data);
    //   try {
    //     const res = await signupApi.post(data);
    //     console.log("res:", res.data);
    //     navigation.navigate("login");
    //   } catch (error) {
    //     setActiveSignup(false);
    //     console.log(error)
    //   }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 18 }}> Nhập số điện thoại của bạn?
            </Text>


            <View style={styles.content}>
                <TextInput
                    style={[styles.input, styles.inputPassword]}
                    // secureTextEntry={true}
                    placeholder="Số điện thoại"
                    placeholderTextColor="#cdcdcf"
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    keyboardType="numeric"
                />

                {/* <TextInput
                    style={[styles.input, styles.inputPassword]}
                    secureTextEntry={true}
                    placeholder="Mật khẩu"
                    placeholderTextColor="#cdcdcf"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
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
                <View style={styles.form_item}>
                    <Input
                        style={[styles.input, styles.inputPassword]}
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        // errorMessage={errConfirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        rightIcon={checkHidePass()}
                        secureTextEntry={hidePassword}
                    ></Input>
                </View>
                <Text style={{ color: "red", fontSize: 16 }}>{errPass}</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddPhoneAndPassword}
                >
                    <Text style={styles.buttonText}>Tiếp</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default PhoneAndPasswordScreen;

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
