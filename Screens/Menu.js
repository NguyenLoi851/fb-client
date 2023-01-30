import { View, Text, TouchableOpacity, Image } from "react-native";
import * as SecureStore from "expo-secure-store";
import { logoutApi } from "../apis/Auth/logoutApi";
import { navigation } from "../rootNavigation";
import { FontAwesome } from '@expo/vector-icons'; 




const Shortcut = (props) => {
  const { name, icon, des } = props;
  return (
    <View
      style={{
        backgroundColor: "#fff",
        flexGrow: 1,
        borderRadius: 10,
        padding: 16,
        margin: 5,
      }}
      // onTouchEnd={() => navigation.navigate(des)}
    >
      <Image
        source={{
          uri: icon,
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 100,
        }}
      ></Image>
      <Text
        style={{ color: "#333", fontWeight: "600", fontSize: 18, marginTop: 8 }}
      >
        {name}
      </Text>
    </View>
  );
};

const Menu = () => {
  const handleLogOut = async () => {
    try {
      const data = {token: token};
      console.log("Hello logout")
      await logoutApi.logout(data);

      navigation.navigate('login');
    }
    catch(err) {
      console.log(err)
    }
  }
  return (
    <View style={{ padding: 16 }}>
      <View>
        <Text style={{ color: "#000", fontWeight: "700", fontSize: 30 }}>
          Menu
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <View>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU",
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              marginRight: 10,
            }}
          ></Image>
        </View>
        <View onTouchEnd={() => navigation.navigate('profile')}>
          <Text style={{ color: "#333", fontWeight: "600", fontSize: 24 }}>
            Lương Hoàng
          </Text>
          <Text style={{ color: "#777", fontWeight: "600", fontSize: 18 }}>
            See your profile
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: "#aaa",
          borderBottomWidth: 1,
          marginTop: 10,
          marginBottom: 10,
        }}
      />
      <View>
        <Text
          style={{
            color: "#333",
            fontWeight: "600",
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          All shortcuts
        </Text>
      </View>
      <View style={{ display: "flex" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Shortcut
            name="Đã lưu"
            icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU"

          ></Shortcut>
          <Shortcut
            name="Nhóm"
            icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU"
          ></Shortcut>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Shortcut
            name="Bảng tin"
            icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU"
          ></Shortcut>
          <Shortcut
            name="Bạn bè"
            icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU"
          ></Shortcut>
        </View>


        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Shortcut
            name="Sự kiện"
            icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU"
          ></Shortcut>
          <Shortcut
            name="Chơi game"
            icon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU"
          ></Shortcut>
        </View>

        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            style={{ backgroundColor: "#ccc", borderRadius: 10, padding: 10 }}
            onPress={handleLogOut}
          >
            <Text
              style={{
                color: "#333",
                fontWeight: "600",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Menu;
