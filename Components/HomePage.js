import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import Post from "./Post";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { navigation } from "../rootNavigation";
import { Image } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import {
	Ionicons,
	MaterialIcons,
	MaterialCommunityIcons
} from '@expo/vector-icons'
import styled from 'styled-components/native'


const Row = styled.View`
	flex-direction: row;
	background: #ffffff;
	width: 100%;
	padding: 0 11px;
	align-items: center;
`
const Divider = styled.View`
	width: 100%;
	height: 0.5px;
	background: #f0f0f0;
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
const BottomDivider = styled.View`
	width: 100%;
	height: 9px;
	background: #f0f2f5;
`

const HomePage = () => {
  const user = useSelector((state) => state);
  console.log("Homepage", JSON.stringify(user,0,2))
  return (
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
        </TouchableOpacity>
				<Divider />

        <Row>
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
				</Row>


        <Post />
        <Post />
        <Post />
        <Post />
      </ScrollView>
    </View>

  );
};

export default HomePage;

const styles = StyleSheet.create({});
