import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Icon, Input } from "react-native-elements";
import { loginApi } from "../apis/Auth/loginApi";
import { EMAIL_REGEX } from "../common/regex";
import { getToken } from "../utils/getToken";
import { navigation } from "../rootNavigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/user";
import { StatusBar } from "expo-status-bar";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [width, setWidth] = useState(null);
  const [password, setPassword] = useState("");
  const [errMail, setErrMail] = useState("");
  const [errPass, setErrPass] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setWidth(Dimensions.get("window").width);
  }, []);

  const validate = () => {
    if (email === "") {
      setErrMail("Required");
      if (password === "") {
        setErrPass("Required");
        return false;
      } else setErrPass(null);
      return false;
    } else setErrMail(null);
    if (!EMAIL_REGEX.test(email)) {
      setErrMail("Invalid Email");
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (validate()) {
      setIsSubmitting(true);
      const data = {
        email: email,
        password: password,
        uuid: "12312313",
      };
      const res = loginApi.login(data);
      res.then(async (res) => {
        const token = getToken(res.headers["set-cookie"][0]);
        await SecureStore.setItemAsync("access_token", token.access_token);
        await SecureStore.setItemAsync("refresh_token", token.refresh_token);
        dispatch(addUser(res.data.data.user));
        setIsSubmitting(false);
        navigation.navigate("facebook");
      });
      res.catch((err) => {
        console.log("err", err);
        setErrMail(err.message);
        setIsSubmitting(false);
      });
    }
  };

  return (
    <>
    <StatusBar style="light" />
    <Image
      source={require("../assets/imgs/Bg_login.jpg")}
      style={styles.banner}
    ></Image>
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TextInput
        style={[styles.input, styles.inputUsername]}
        placeholder="Nhập số điện thoại hoặc email"
        placeholderTextColor="#cdcdcf" />

        <TextInput
        style={[styles.input, styles.inputPassword]}
        placeholder="Nhập mật khẩu"
        placeholderTextColor="#cdcdcf"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        errorMessage={errPass} />

        <TouchableOpacity
          disabled={isSubmitting}
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity 
        style={[styles.button, styles.buttonRegister]}
        onPress={() => navigation.navigate("signup")}>
          <Text style={[styles.buttonText, styles.buttonRegisterText]}>
            Tạo tài khoản mới
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    padding: 22,
  },
  banner: {
    resizeMode: "contain",
    width: "100%",
    height: null,
    aspectRatio: 910 / 460, // Image ratio
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
