import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import Post from "./Post";
import React, {useState, useEffect} from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { navigation } from "../rootNavigation";
import { Image } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import DefaultAvatar from "../assets/imgs/default_avatar.png"
import { upPostApi } from "../apis/Post/upPostApi";

const HomePage = () => {
  const store = useSelector((state) => state);
  console.log("Homepage", JSON.stringify(store, 0, 2))
  const [post, setPost] = useState([])
  const token = store.user.user.token;

  useEffect(() => {
    getPost()
  }, [])
  

  const getPost = async () => {
    try {
      const res = await upPostApi.get(token)
      console.log("post", JSON.stringify(res.data.data, 0, 2))
      setPost(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
    <View>
      <ScrollView
        horizontal={false}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("createPost");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: "#fff",
              alignItems: "center",
            }}
          >
            <Image
              source={
                //   {
                //   // uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU",
                //   uri: "../assets/imgs/default_avatar.png"
                // }
                DefaultAvatar
              }
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
                marginRight: 10,
              }}
            ></Image>
            <TextInput
              placeholder="Bạn đang nghĩ gì..."
              style={{
                borderRadius: 100,
                flex: 1,
                borderWidth: 1,
                borderColor: "#CFCFD5",
                paddingHorizontal: 20,
                paddingVertical: 5,
                marginRight: 15,
              }}
            ></TextInput>
            <Icon type="ionicon" name="images" color={"#58C472"}></Icon>
          </View>
        </TouchableOpacity>

        {/* <Post />
        <Post />
        <Post />
        <Post /> */}
        {post.length > 0 && post.map(item => (<Post prop={item}/>))}
      </ScrollView>
    </View>
     {/* post.map(item=>(<Post {{item.described, item.author.username}}/>)) */}

    
    <View>
      <Text>HomeTab</Text>
    </View>
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
