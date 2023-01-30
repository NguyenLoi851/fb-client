import * as React from 'react';
import { Button, View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';
import { navigation } from "../../rootNavigation"

const RulesScreen = () => {
    return (
        <View>
            <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 18, marginTop: 90 }}>
                Hoàn tất đăng ký
            </Text>

            <Text style={{marginLeft: 30, marginRight: 30, marginTop: 30}}>
                Điều khoản & quyền riêng tư
                Hoàn tất đăng ký
                Bằng cách nhấn vào Đăng ký, bạn đồng ý với Điều
                khoản, Chính sách dữ liệu và Chính sách cookie của
                chúng tôi. Bạn có thể nhận được thông báo của
                chúng tôi qua SMS và chọn không nhận bất cứ lúc
                nào. Thông tin từ danh bạ của bạn sẽ được tải lên
                Facebook liên tục để chúng tôi có thể gợi ý bạn bè,
                cung cấp và cải thiện quảng cáo cho bạn và người
                khác, cũng như mang đến dịch vụ tốt hơn.
            </Text>

            <View style={{ textAlign: "center", alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                <TouchableOpacity
                    style={[styles.button, { width: 300 }]}
                    onPress={() => navigation.navigate('email')}
                >
                    <Text style={styles.buttonText}>Tiếp</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default RulesScreen;

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