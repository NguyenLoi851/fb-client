import { View, Text, Image, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "../Components/Post";
import { Icon } from "react-native-elements";
import { navigation } from "../rootNavigation";
import uuid from "react-uuid";
import { fileURL } from "../common/baseUrl";
import { DocumentAPI } from "../apis/Documents/DocumentAPI";
import DefaultAvatar from "../assets/imgs/default_avatar.png"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import styled from 'styled-components/native'
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import { upPostApi } from "../apis/Post/upPostApi";
import { friendApi } from "../apis/Friends/FriendApi";
import { UserAPI } from "../apis/User/UserAPI";

const Divider = styled.View`
	width: 100%;
	height: 0.5px;
	background: #f0f0f0;
`
const Row = styled.View`
	flex-direction: row;
	background: #ffffff;
	width: 100%;
	padding: 0 11px;
	align-items: center;
`
const Menu = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 42px;
`
const MenuText = styled.Text`
	padding-left: 11px;
	font-weight: 500;
	font-size: 12px;
`
const Separator = styled.View`
	width: 1px;
	height: 26px;
	background: #f0f0f0;
`
const OtherProfile = () => {
  const store = useSelector((state) => state);
  const [post, setPost] = useState([])
    console.log("otherprofile", JSON.stringify(store, 0, 2))
    const otherUser = store.user.otherUser
  const [coverIMGURI, setCoverIMGURI] = useState(fileURL+otherUser.cover_image.fileName)
// const coverIMGURI = 
  const [profileIMGURI, setProfileIMGURI] = useState(fileURL+otherUser.avatar.fileName)
// const profileIMGURI = 
  const [friends, setFriends] = useState([])

//   const token = store.user.user.token;
const token = otherUser.token

  useEffect(() => {


    // getData()
    getPost()
    getFriends()
    setCoverIMGURI(otherUser.cover_image.fileName)
    setProfileIMGURI(otherUser.avatar.fileName)
    // var newURI = fileURL+

  }, [])

  const getFriends = async () => {
    try {
      const res = await friendApi.getListFriends(token)
      console.log("myfriend",JSON.stringify(res.data, 0, 2))
      setFriends(res.data.data.friends)
    } catch (error) {
      console.log("myfriend",error)
    }
  }

  const getPost = async () => {
    try {
      const params = {userId: otherUser._id}
      const res = await upPostApi.get(token, params)
      console.log("other post", res.data)
      console.log("post", JSON.stringify(res.data.data, 0, 2))
      setPost(res.data.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }

//   const getData = async () => {
//     console.log("odaythangnuloi")

//     console.log(JSON.stringify(store, 0, 2))

//     var user = store.user.user.data

//     const coverID = user.cover_image
//     const profileID = user.avatar
//     try {
//       const coverRes = await DocumentAPI.get(coverID)
//       setCoverIMGURI(fileURL + coverRes.data.data.fileName)
//     } catch (error) {
//       console.log(error)
//     }
//     try {
//       const profileRes = await DocumentAPI.get(profileID)
//       setProfileIMGURI(fileURL + profileRes.data.data.fileName)
//     } catch (error) {
//       console.log(error)
//     }
//   }

  const getAvatarReload = async() => {
    try {
        const coverResReload = await UserAPI.show(token)
        console.log("huhon", JSON.stringify(coverResReload.data, 0, 2))
        setProfileIMGURI(fileURL + coverResReload.data.data.avatar.fileName)
    } catch (error) {
        console.log(error)
    }
}

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async() => {
    setRefreshing(true);
    setPost([])
    setFriends([])
    await getPost()
    await getFriends()
    await getAvatarReload()
    setTimeout(async () => {
      setRefreshing(false);
    }, 1000);
  };
  return (
    <View style={{ paddingVertical: 10 }}>
      <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing}
            onRefresh={onRefresh} />
        }
          // horizontal={false}
          // style={{ display: "flex", flexDirection: "column" }}
        >
        <View style={{ position: "relative", backgroundColor: "#fff" }}>
          <View>
            <Image
              style={{ height: 230, width: "100%" }}
            //   source={{ uri: coverIMGURI }}
              source={{ uri: fileURL + otherUser.cover_image.fileName }}
            ></Image>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 50,
              left: 10,
              backgroundColor: "#fff",
              borderRadius: 100,
              width: 150,
              height: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                height: 140,
                width: 140,
                borderRadius: 100,
              }}
            //   source={{ uri: profileIMGURI }}
              source={{ uri: fileURL + otherUser.avatar.fileName }}
            ></Image>
          </View>
          <View
            style={{
              marginTop: 50,
              marginBottom: 10,
              paddingHorizontal: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "700" }}>
              {otherUser.username}
            </Text>
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate({ name: "updateProfile" });
              }}
              style={{
                height: 30,
                width: 30,
                borderRadius: 4,
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#3982E4",
              }}
            > */}
              {/* <Icon name="edit" type="material" color="#fff"></Icon> */}
            {/* </TouchableOpacity> */}
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#fff",
            marginTop: 10,
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}
        >
          <View>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>Bạn bè</Text>
            <Text>{friends.length} người bạn</Text>
          </View>
          <View>
            <View
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                flexDirection: "row",
                gap: 10,
              }}
            >
              {/* {[1, 2, 3, 4, 5, 6].map((item) => {
                return (
                  <TouchableOpacity key={}>
                    <View
                      style={{
                        marginBottom: 5,
                      }}
                    >
                      <Image
                        style={{ width: 115, height: 115, borderRadius: 10 }}
                        source={{
                          uri: "https://source.unsplash.com/random?sig=10",
                        }}
                      ></Image>
                      <Text
                        style={{
                          marginLeft: 5,
                          marginTop: 5,
                          overflow: "hidden",
                          fontSize: 16,
                          fontWeight: "600",
                        }}
                      >
                       dat
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })} */}
            </View>
            <View>
              <TouchableOpacity
                style={{
                  width: "100%",
                  marginTop: 10,
                  paddingVertical: 5,
                  borderRadius: 8,
                  backgroundColor: "#e4e4e4",
                }}
                onPress={()=>navigation.navigate("all-friend-profile")}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  {" "}
                  Xem tất cả bạn bè
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ margin: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>Bài viết</Text>
        </View>

        <View>
          {/* <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing}
              onRefresh={onRefresh} />
          }
            horizontal={false}
            style={{ display: "flex", flexDirection: "column" }}
          > */}
          {/* <TouchableOpacity
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
              {
                profileIMGURI != "" ?
                  <Image
                    source={{ uri: profileIMGURI }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 100,
                      marginRight: 10,
                    }}
                  ></Image> :

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

              }
              <TextInput
                placeholder="Bạn đang nghĩ gì?"
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
          </TouchableOpacity> */}
          <Divider />

          {/* <Row>
            <Menu>
              <Ionicons name='ios-videocam' size={22} color='#F44337' />
              <MenuText>Live</MenuText>
            </Menu>
            <Separator />

            <Menu>
              <MaterialIcons
                name='photo-size-select-actual'
                size={20}
                color='#4CAF50'
              />
              <MenuText>Photo</MenuText>
            </Menu>
            <Separator />

            <Menu>
              <MaterialCommunityIcons
                name='video-plus'
                size={22}
                color='#E141FC'
              />
              <MenuText>Room</MenuText>
            </Menu>
          </Row> */}

          {post.length > 0 && post.map(item => (<Post key={item} prop={item} />))}

          {/* </ScrollView> */}
        </View>
      </ScrollView>
    </View>

  );
};

export default OtherProfile;
