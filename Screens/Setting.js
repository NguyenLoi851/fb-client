// import ScreenNames from 'general/constants/ScreenNames'
import React from 'react'
import {
  View,
  Text,
  Touchable,
} from 'react-native'
// import { Link } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler'
import { navigation } from '../rootNavigation'

const SettingTab = () => {

  return (
    <View 
    // style={styles.wrapper}
    >
      {/* Tài khoản */}

      <View style={styles.group}> 
        <Text style={styles.labelGroup}>Tài khoản</Text>
        <Text style={styles.noteGroup}>Cập nhật thông tin để góp phần bảo vệ tài khoản.</Text>
        {/* <Link to={{screen: ScreenNames.inforUser}}> */}
        <TouchableOpacity 
        // onPress={()=>navigation.navigate("")}
        >
          <View style={styles.item}>
            <Icon
            name='user-circle'
            style={styles.iconUser}
            />
            <Text style={styles.labelItem}>Thông tin cá nhân và tài khoản</Text>
          </View>
        </TouchableOpacity>
        {/* </Link> */}
        {/* <Link to={{screen: ScreenNames.security}}> */}
        <TouchableOpacity>
          <View style={styles.item}>
            <MaterialCommunityIcons
            name='security'
            style={styles.icon}
            />
            <Text style={styles.labelItem}>Mật khẩu và bảo mật</Text>
          </View>
          </TouchableOpacity>
        {/* </Link> */}
      </View>

      {/* Tùy chọn */}

      <View style={styles.group}> 
        <Text style={styles.labelGroup}>Tùy chọn</Text>
        <Text style={styles.noteGroup}>Tùy chỉnh trải nghiệm của bạn trên Facebook.</Text>
        {/* <Link to={{screen: ScreenNames.notificationSetting}}>
         */}
         <TouchableOpacity>
          <View style={styles.item}>
            <Ionicons
            name='notifications'
            style={styles.icon}
            />
            <Text style={styles.labelItem}>Thông báo</Text>
          </View>
          </TouchableOpacity>
        {/* </Link> */}
        
      </View>

      {/* Đối tượng và chế độ hiển thị */}

      <View style={styles.group}> 
        <Text style={styles.labelGroup}>Đối tượng và chế độ hiển thị</Text>
        <Text style={styles.noteGroup}>Kiểm soát ai có thể xem bài viết, tin và trang cá nhân của bạn.</Text>
        {/* <Link to={{screen: ScreenNames.block}}> */}
        <TouchableOpacity>
          <View style={styles.item}>
            <Icon
            name='user-times'
            style={styles.icon}
            />
            <Text style={styles.labelItem}>Chặn</Text>
          </View>
          </TouchableOpacity>
        {/* </Link> */}
        
      </View>
    </View>
    // <View>
    //     <Text>
    //         Hello
    //     </Text>
    // </View>
  )
}

export default SettingTab


const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#fff",
        flex: 1
    },
    group: {
        padding: 10,
    },
    labelGroup: {
        color: "black",
        fontSize: 20,
        fontWeight: "700"
    },
    noteGroup: {
        color: "#aaa",
        fontSize: 13,
    },
    item: {
        display: "flex",
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5,
        alignItems: "center"
    },
    iconUser: {
        color: "black",
        fontSize: 20,
        padding: 10,
    },
    icon: {
        color: "black",
        fontSize: 25,
        padding: 10,
    },
    labelItem: {
        color: "black",
        fontSize: 15,
        fontWeight: "600"
    },
})
