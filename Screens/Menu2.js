import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, RefreshControl } from 'react-native'
// import styles from './styles'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'
// import ScreenNames from 'general/constants/ScreenNames'
// import { getPreference, removePreference } from 'libs/storage/PreferenceStorage'
// import { serverDomain, PreferenceKeys } from 'general/constants/Global'
import { StyleSheet } from "react-native";
import { navigation } from "../rootNavigation";
import { useDispatch, useSelector } from 'react-redux'
import DefaultAvatar from "../assets/imgs/default_avatar.png"
import { navigate } from '../store/user';
import SettingTab from './Setting';
import { DocumentAPI } from '../apis/Documents/DocumentAPI';
import { fileURL } from '../common/baseUrl';
import { ScrollView } from 'react-native-gesture-handler';
import { UserAPI } from '../apis/User/UserAPI';

const Menu2 = () => {
    const dispatch = useDispatch()
    const [openHelp, setOpenHelp] = useState(false)
    const [openSetting, setOpenSetting] = useState(false)

    const store = useSelector((state) => state)
    const username = store.user.user.data.username;
    const [random, setRandom] = useState(0)
    const [profileIMGURI, setProfileIMGURI] = useState("")
    const avatarId = store.user.user.data.avatar
    console.log("Menu", JSON.stringify(store, 0, 2))
    const token = store.user.user.token

    useEffect(() => {
        getAvatar()
    }, [])

    const getAvatar = async () => {
        try {
            const coverRes = await DocumentAPI.get(avatarId)
            setProfileIMGURI(fileURL + coverRes.data.data.fileName)
            console.log("avatar in menu", coverRes.data.data.fileName)
        } catch (error) {
            console.log(error)
        }
    }

    const getAvatarReload = async() => {
        try {
            const coverResReload = await UserAPI.show(token)
            console.log("huhon", JSON.stringify(coverResReload.data, 0, 2))
            setProfileIMGURI(fileURL + coverResReload.data.data.avatar.fileName)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogOut = async () => {
        try {
            // const data = {token: token};
            // await logoutApi.logout(data);
            // await SecureStore.deleteItemAsync("access_token");
            // await SecureStore.deleteItemAsync("refresh_token");
            navigation.navigate('login');
        }
        catch (err) {
            console.log(err)
        }
    }
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async() => {
      setRefreshing(true);
      await getAvatarReload();
      setTimeout(async () => {
        setRefreshing(false);
      }, 1000);
    };
    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing}
                onRefresh={onRefresh} />
        }
        >
            <View style={styles.wrapper}>
                <View style={styles.navbar}>
                    <View style={styles.headerNav}>
                        <Text style={styles.labelNav}>Menu</Text>
                        <Icon name="search" style={styles.iconSearch} />
                    </View>
                    <TouchableOpacity
                        //   onPress={() => {
                        //     navigate(ScreenNames.profileView)
                        //   }}
                        style={styles.linkUser}
                    >
                        {/* <Text style={styles.userName}>{username}</Text>
           */}
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginTop: 10,
                                alignItems: "center",
                            }}
                        >
                            <View>
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
                                        ></Image>
                                        :
                                        <Image
                                            // source={{
                                            //   uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHMbNbn5XcHIXV3PoLxkmsKdTQIbNffNpyuQ&usqp=CAU",
                                            // }}
                                            source={DefaultAvatar}
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 100,
                                                marginRight: 10,
                                            }}
                                        ></Image>
                                }

                            </View>
                            <View onTouchEnd={() => navigation.navigate('profile')}>
                                <Text style={{ color: "#333", fontWeight: "600", fontSize: 24 }}>
                                    {username}
                                </Text>
                                <Text style={{ color: "#777", fontWeight: "600", fontSize: 18 }}>
                                    Xem tài khoản cá nhân
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* Trợ giúp & hỗ trợ */}
                <View style={openHelp && styles.dropdownHelpOpen}>
                    <DropDownPicker
                        placeholder="Trợ giúp & hỗ trợ"
                        style={styles.dropdownStyle}
                        textStyle={{
                            fontSize: 20,
                            fontWeight: '700',
                        }}
                        open={openHelp}
                        setOpen={setOpenHelp}
                        items={[
                            {
                                label: 'Điều khoản & chính sách',
                                value: '1',
                                icon: () => <Icon name="book" style={styles.icon} />,
                                containerStyle: {
                                    height: 60,
                                    backgroundColor: '#fff',
                                    borderWidth: 0,
                                    borderColor: '#dfdfdf',
                                    borderRadius: 8,
                                    margin: 5,
                                    color: 'black',
                                    fontWeight: '600',
                                },
                            },
                        ]}
                        dropDownContainerStyle={styles.dropDownContainerStyle}
                        listItemLabelStyle={styles.listItemLabelStyle}
                        onSelectItem={(item) => {
                            // navigate(ScreenNames.termsPolicies)
                        }}
                    />
                </View>
                {/* Cài đặt và quyền riêng tư */}
                <View style={openSetting && styles.dropdownSettingOpen}>
                    <DropDownPicker
                        placeholder="Cài đặt và quyền riêng tư"
                        style={styles.dropdownStyle}
                        textStyle={{
                            fontSize: 20,
                            fontWeight: '700',
                        }}
                        open={openSetting}
                        setOpen={setOpenSetting}
                        items={[
                            {
                                label: 'Cài đặt',
                                value: '1',
                                icon: () => <Icon name="user-circle" style={styles.icon} />,
                                containerStyle: {
                                    height: 60,
                                    backgroundColor: '#fff',
                                    borderWidth: 0,
                                    borderColor: '#dfdfdf',
                                    borderRadius: 8,
                                    margin: 5,
                                    color: 'black',
                                    fontWeight: '600',
                                },
                            },
                        ]}
                        dropDownContainerStyle={styles.dropDownContainerStyle}
                        listItemLabelStyle={styles.listItemLabelStyle}
                        onSelectItem={(item) => {
                            // dispatch(navigate("setting"))
                            // setRandom(Math.random())
                            // this.forceUpdate()
                            navigation.navigate("setting")
                            // return <SettingTab />
                        }}
                    />
                </View>
                {/* Đăng xuất */}
                {/* <TouchableOpacity style={styles.logOut} onPress={handleLogOut}>
                <Text style={styles.labelLogOut}>Đăng xuất</Text>
            </TouchableOpacity> */}
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
        </ScrollView>

    )
}

export default Menu2

const styles = StyleSheet.create({
    wrapper: {
    },
    headerNav: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        marginLeft: 15,
        marginRight: 15,
    },
    labelNav: {
        color: "black",
        fontSize: 25,
        fontWeight: "700",
    },
    icon: {
        color: "black",
        fontSize: 20,
        backgroundColor: "#fff",
    },
    iconSearch: {
        color: "black",
        fontSize: 20,
        width: 35,
        height: 35,
        borderRadius: 35,
        backgroundColor: "#fff",
        padding: 6,
    },
    linkUser: {
        borderBottomColor: "#888",
        borderBottomWidth: 0.5,
        margin: 10
    },
    userName: {
        color: "black",
        fontWeight: "600",
        fontSize: 18
    },
    textNoteUser: {
        paddingBottom: 10
    },
    dropdownHelpOpen: {
        height: 139,
    },
    dropdownSettingOpen: {
        height: 139,
    },
    dropdownStyle: {
        backgroundColor: "#dfdfdf",
        borderRadius: 0,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
    dropDownContainerStyle: {
        backgroundColor: "#dfdfdf",
        borderWidth: 0,
        padding: 10,
    },
    listItemLabelStyle: {
        fontSize: 15,
        fontWeight: "600",
    },
    logOut: {
        backgroundColor: "#ccc",
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 8,
    },
    labelLogOut: {
        color: "black",
        fontSize: 15,
        fontWeight: "700",
        padding: 5,
        textAlign: "center",
    }
})
