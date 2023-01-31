import React, { useState } from "react";
import { Button, View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';
import { navigation } from "../../rootNavigation"
import { Icon, Input } from "react-native-elements";
import { useDispatch } from 'react-redux';
import { addName } from '../../store/user';
import {isValidFirstName, isValidLastName } from '../../utils/validations';



const NameScreen = () => {
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")


    // state for validation
    const [errorFirstName, setErrorFirstName] = useState("")
    const [errorLastName, setErrorLastName] = useState("")


    const handleSubmitName = () => {
        const name = firstName + " " + lastName;
        dispatch(addName(name))
        navigation.navigate('date')
    }

    return (
        <View>
 
            <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 18, marginTop: 90 }}> Bạn tên gì?</Text>

            <View style={[styles.row, {marginTop: 50}]}>
                <TextInput 
                    style={[styles.input, styles.inputWrap]}
                    placeholder="Họ"
                    placeholderTextColor="#cdcdcf"
                    value={firstName}
                    onChangeText={(text) =>{
                        setErrorFirstName(isValidFirstName(text) == true ? "" : "Hãy nhập đúng tên" ) 
                        setFirstName(text)
                    }    
                    }
                />         

                <TextInput 
                    style={[styles.input, styles.inputWrap]}
                    placeholder="Tên"
                    placeholderTextColor="#cdcdcf"
                    value={lastName}
                    onChangeText={(text)=>{
                        setErrorLastName(isValidLastName(text) == true ? "" : "Hãy nhập đúng họ" ) 
                        setLastName(text)
                    }
                    }
                />
            </View>

            <View style={[ {marginTop: 50}]}>
            <Text style={{ color: "red", fontSize: 16 }}>{ errorFirstName }</Text>
            <Text style={{ color: "red", fontSize: 16 }}>{ errorLastName }</Text>
            </View>


            <View style={{ textAlign: "center", alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                <TouchableOpacity
                    style={[styles.button, { width: 300 }]}
                    onPress={handleSubmitName}
                >
                    <Text style={styles.buttonText}>Tiếp</Text>
                </TouchableOpacity>

            </View>


        </View>
    );
}

export default NameScreen;

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
    row: {
        flex: 1,
        flexDirection: "row"
      },
      inputWrap: {
        flex: 1,
        borderColor: "#cccccc",
      },
});
