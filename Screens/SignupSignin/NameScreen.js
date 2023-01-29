import * as React from 'react';
import { Button, View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';
import { navigation } from "../../rootNavigation"

const NameScreen = () => {
    return (
        <View>

            <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 18, marginTop: 90 }}> Bạn tên gì?</Text>


            <View style={[styles.row, {marginTop: 50}]}>
                <TextInput 
                    style={[styles.input, styles.inputWrap]}
                    placeholder="Tên"
                    placeholderTextColor="#cdcdcf"
                />
                <TextInput 
                    style={[styles.input, styles.inputWrap]}
                    placeholder="Họ"
                    placeholderTextColor="#cdcdcf"
                />
            </View>


            <View style={{ textAlign: "center", alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                <TouchableOpacity
                    style={[styles.button, { width: 300 }]}
                    onPress={() => navigation.navigate('date')}
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