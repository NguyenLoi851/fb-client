import { StyleSheet, View, Text } from "react-native";
import CreatePost from "./Screens/CreatePost.js";
import LoginPage from "./Screens/LoginPage.js";
import SignupPage from "./Screens/SignupPage.js";
import * as React from "react";

import { Icon } from "react-native-elements";

import { navigationRef } from "./rootNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Header from "./Components/Header";
import VerifyEmail from "./Screens/VerifyEmail.js";
import HomePage from "./Components/HomePage.js";
import Profile from "./Screens/Profile.js";
import UpdateProfile from "./Screens/UpdateProfile.js";
import BlockList from "./Screens/BlockList.js";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store.js";

import Menu from "./Screens/Menu.js";
import HomeScreen from "./Screens/SignupSignin/HomeScreen.js";
import ConfirmScreen from "./Screens/SignupSignin/ConfirmScreen.js";
import CreateAccountScreen from "./Screens/SignupSignin/CreateAccountScreen.js";
import DateScreen from "./Screens/SignupSignin/DateScreen.js";
import EmailScreen from "./Screens/SignupSignin/EmailScreen.js";
import NameScreen from "./Screens/SignupSignin/NameScreen.js";
import RulesScreen from "./Screens/SignupSignin/RulesScreen.js";
import PhoneAndPasswordScreen from "./Screens/SignupSignin/PhoneAndPasswordScreen.js";
import { LogBox } from 'react-native';
import Menu2 from "./Screens/Menu2.js";
import Setting from "./Screens/Setting.js";
import Security from "./Screens/Security.js";
import ChangePassword from "./Screens/ChangePassword.js";
import FriendScreen from "./Screens/FriendScreen/index.js";

const Stack = createStackNavigator();
const rootStack = createStackNavigator();
LogBox.ignoreLogs([
  "Overwriting fontFamily style attribute preprocessor"
]);
LogBox.ignoreLogs([
  "Encountered two children with the same key, `[object Object]`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version."
]);
const Home = () => {
  return (
    <View>
      <HomePage />
    </View>
  );
};
const HomeTab = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
const FriendTab = () => {
  return (
    <View>
      {/* <Text>friendTab</Text> */}
      <FriendScreen />
    </View>
  );
};
const ProfileTab = () => {
  return (
    <View>
      <Profile />
    </View>
  );
};
const MessengerTab = () => {
  return (
    <View>
      <Text>messengerTab</Text>
    </View>
  );
};
const NotificationTab = () => {
  return (
    <View>
      <Text>notificationTab</Text>
    </View>
  );
};
// const MenuTab = () => {
//   return (
//     <View>
//       <Menu />
//     </View>
//   );
// };

const MenuTab = () => {
    return (
    <View>
      <Menu2 />
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();
export const MainTab = () => {
  const mainTabNavigationOptions = {
    tabBarStyle: {
      height: 60,
    },
    tabBarShowIcon: true,
    tabBarShowLabel: false,
  };
  return (
    <>
      <Header></Header>
      <Tab.Navigator
        initialRouteName="HomeTab"
        screenOptions={mainTabNavigationOptions}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon
                name="home"
                size={25}
                color={focused ? "#318bfb" : "#ddd"}
              ></Icon>
            ),
          }}
          name="HomeTab"
          component={HomeTab}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon
                name="group"
                size={25}
                color={focused ? "#318bfb" : "#ddd"}
              ></Icon>
            ),
            headerShown: true,
          }}
          name="Friend"
          component={FriendTab}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon
                name="person"
                size={25}
                color={focused ? "#318bfb" : "#ddd"}
              ></Icon>
            ),
            headerShown: true,
          }}
          name="Profile"
          component={ProfileTab}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon
                name="email"
                size={25}
                color={focused ? "#318bfb" : "#ddd"}
              ></Icon>
            ),
          }}
          name="Messenger"
          component={MessengerTab}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon
                name="notifications"
                size={25}
                color={focused ? "#318bfb" : "#ddd"}
              ></Icon>
            ),
          }}
          name="Notification"
          component={NotificationTab}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon
                name="menu"
                size={25}
                color={focused ? "#318bfb" : "#ddd"}
              ></Icon>
            ),
          }}
          name="Menu"
          component={MenuTab}
        />
      </Tab.Navigator>
    </>
  );
};

export default function App() {
  const navigationOptions = {
    headerShown: false,
    headerMode: "screen",
  };
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <rootStack.Navigator>
        <rootStack.Screen component={HomeScreen} name="login" options={{headerShown: false}}/>
          {/* <rootStack.Screen component={LoginPage} name="login" /> */}
          <rootStack.Screen component={VerifyEmail} name="verify"/>
          <rootStack.Screen component={CreateAccountScreen} name="create-account" options={{ title: 'Tạo tài khoản' }}/>
          <rootStack.Screen component={NameScreen} name="name" options={{ title: 'Tên' }}/>
          <rootStack.Screen component={DateScreen} name="date" options={{ title: 'Ngày sinh' }}/>
          <rootStack.Screen component={RulesScreen} name="rules" options={{ title: 'Điều khoản & quyền riêng tư' }}/>
          <rootStack.Screen component={EmailScreen} name="email" options={{ title: 'Địa chỉ email' }}/>
          <rootStack.Screen component={ConfirmScreen} name="confirm" options={{ title: 'Xác nhận tài khoản' }}/>
          <rootStack.Screen component={PhoneAndPasswordScreen} name="phone-password" options={{title: 'Điện thoại và mật khẩu'}}/>
          
          
          <rootStack.Screen component={MainTab} name="facebook" options={{headerShown: false}}/>
          <rootStack.Screen component={ProfileTab} name="profile" options={{headerShown: false}}/>
          <rootStack.Screen component={SignupPage} name="signup" options={{headerShown: false}}/>
          <rootStack.Screen component={CreatePost} name="createPost" options={{headerShown: false}}/>
          <rootStack.Screen component={BlockList} name="blockList" options={{headerShown: false}}/>
          <rootStack.Screen component={UpdateProfile} name="updateProfile" options={{headerShown: false}}/>
          <rootStack.Screen component={Setting} name="setting" options={{title: 'Cài đặt'}}/>
          <rootStack.Screen component={Security} name="security" options={{title: "Mật khẩu và bảo mật"}}/>
          <rootStack.Screen component={ChangePassword} name="change-password" options={{title: "Thay đổi mật khẩu"}}/>
        </rootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
