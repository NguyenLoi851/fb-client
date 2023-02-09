import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "../Components/Post";
import { Icon } from "react-native-elements";
import { navigation } from "../rootNavigation";
import uuid from "react-uuid";
import { fileURL } from "../common/baseUrl";
import { DocumentAPI } from "../apis/Documents/DocumentAPI";

const Profile = () => {
  const store = useSelector((state) => state);

  const [coverIMGURI,setCoverIMGURI] = useState("")
  const [profileIMGURI,setProfileIMGURI] = useState("")


  useEffect(()=>{
    
    
    getData()

    // var newURI = fileURL+

  },[])

  const getData=async ()=>{
    console.log("odaythangnuloi")

    console.log(JSON.stringify(store,0,2))

    var user=store.user.user.data

    const coverID = user.cover_image
    const profileID= user.avatar
    try {
       const coverRes = await DocumentAPI.get(coverID)
       setCoverIMGURI(fileURL+coverRes.data.data.fileName)
    } catch (error) {
      console.log(error)
    }
    try {
      const profileRes = await DocumentAPI.get(profileID)
      setProfileIMGURI(fileURL+profileRes.data.data.fileName)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <View style={{ paddingVertical: 10 }}>
      <ScrollView>
        <View style={{ position: "relative", backgroundColor: "#fff" }}>
          <View>
            <Image
              style={{ height: 230, width: "100%" }}
              source={{ uri: coverIMGURI }}
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
              source={{ uri: profileIMGURI }}
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
              Nguyen van Dat
            </Text>
            <TouchableOpacity
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
            >
              <Icon name="edit" type="material" color="#fff"></Icon>
            </TouchableOpacity>
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
            <Text>244 người bạn</Text>
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
        <View>
          {/* <Post />
          <Post />
          <Post />
          <Post /> */}
        </View>
      </ScrollView>
    </View>

  );
};

export default Profile;
