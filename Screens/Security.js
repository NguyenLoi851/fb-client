import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import { StyleSheet } from "react-native";
import { navigation } from '../rootNavigation';

const Security = () => {
  return (
    <View style={styles.wrapper}>
      <Text style = {styles.label}>Mật khẩu và bảo mật</Text>
      <View style = {styles.item}>
        {/* <Text style = {styles.labelItem}>Đăng nhập</Text> */}
        <TouchableOpacity style = {styles.linkItem} onPress = {() => navigation.navigate("change-password")}>
          <Ionicons
          name='key-outline'
          style={styles.iconKey}
          />
          <View style={styles.itemText}>
            <Text style={styles.textLabel}>Đổi mật khẩu</Text>
            <Text style={styles.textNote}>Bạn nên sử dụng mật khẩu mạnh mà mình chưa sử dụng ở đâu khác</Text>
          </View>
          <Icon 
          name='angle-right'
          style={styles.iconNext}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Security

const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
      backgroundColor: '#fff'
   },
   label: {
    fontSize: 25,
    fontWeight: '600',
    color: 'black',
    paddingBottom: 10,
    padding: 20,
   },
   item: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    padding: 20
   },
   labelItem: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
   },
   linkItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between"
   },
   iconKey: {
    fontSize: 25,
    width: "10%"
   },
   itemText: {
      width: "80%"
   },
   textLabel: {
    fontSize: 18,
    color: 'black'
   },
   textNote: {
    fontSize: 15,
    color: '#888'
   },
   iconNext: {
    fontSize: 40,
   },


   wrapperChangePass: {
      backgroundColor: "#fff",
      paddingTop: 15,
      padding: 10,
      flex: 1
   },
   inputItem: {
      
      paddingBottom: 5,
      paddingTop: 5,
   },
   formInput: {
      color: 'black',
      padding: 10,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 4
   },
   buttonGroup: {
      paddingTop: 20,
      paddingBottom: 10,
   },
   buttonUpdate: {
      padding: 8,
      backgroundColor: '#3284ef',
      borderRadius: 2,
      alignItems:'center',
      marginBottom: 8,
   },
   textButtonUpdate: {
      color:'#fff'
   },
   buttonCancel: {
      padding: 6,
      backgroundColor: '#fff',
      borderRadius: 2,
      alignItems:'center',
      borderWidth: 0.5,
      borderColor: '#aaa'
   },
   textButtonCancel: {
      color:'black'
   },
  
     errorMessage: {
      color:'red',
      textAlign: "center",
      }
})
