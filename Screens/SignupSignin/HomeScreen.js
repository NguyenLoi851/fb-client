import React, {useState} from 'react';
import { Button, View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from "expo-status-bar";
import FacebookBannerImage from "../../assets/imgs/facebook-banner.jpg";
import { navigation } from "../../rootNavigation";
import { loginApi } from '../../apis/Auth/loginApi';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/user';

const HomeScreen = () => {
    const dispatch = useDispatch()
    const [phonenumber, setPhonenumber] = useState("")
    const [password, setPassword] = useState("")
    const handleLogin = async() => {
        const data = {
            phonenumber,
            password
        }
        try {
            const res = await loginApi.login(data)
            if(res.data){
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
                        placeholder="Phone or email"
                        placeholderTextColor="#cdcdcf"
                        value={phonenumber}
                        onChangeText={(text)=>setPhonenumber(text)}
                    />

                    <TextInput
                        style={[styles.input, styles.inputPassword]}
                        secureTextEntry={true}
                        placeholder="Password"
                        placeholderTextColor="#cdcdcf"
                        value={password}
                        onChangeText={(text)=>setPassword(text)}
                    />

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={handleLogin}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.link}>
                        <Text style={styles.linkText}>Forgot Password?</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.footer}>
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.dividerLine} />
                    </View>


                    <TouchableOpacity style={[styles.button, styles.buttonRegister]}
                        onPress={() => navigation.navigate('create-account')}>

                        <Text style={[styles.buttonText, styles.buttonRegisterText]}>
                            Create new Facebook account
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

