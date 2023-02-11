import { View, Text, TextInput, TouchableOpacity } from 'react-native'
// import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { StyleSheet } from "react-native";
import { changePasswordApi } from '../apis/Auth/changePassword';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, changeToken } from '../store/user';
import { navigation } from '../rootNavigation';

const ChangePassword=() => {
  const store = useSelector((state)=>state)
  const token = store.user.user.token
  const dispatch = useDispatch()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const handleChangePassword = async () => {
    const data = {
      currentPassword: currentPassword,
      newPassword: newPassword
    }
    try {
      const res = await changePasswordApi.changePassword(data, token)
      console.log(res.data)
      // dispatch(changeToken(res.data.token))
      dispatch(addUser(res.data))
      navigation.navigate("setting")
    } catch (error) {
      console.log(error)
    }
  }
//   const {
//     control,
//     handleSubmit,
//     setError,
//     formState: { errors },
//   } = useForm()

//   const handleUpdate = async () => {
//     try {
//       const userId = await getPreference('UserId')
//       const token = await getPreference('UserToken')

//       const api =
//         serverDomain + `auth/change_password?token=${encodeURIComponent(token)}`

//       const response = await fetch(api, {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           password: currentPassword,
//           new_password: newPassword,
//           userId: userId,
//         }),
//       })
//       const json = await response.json()
//       if (json.code == 1004) {
//         setError('currentPassword', {
//           type: 'custom',
//           message: 'Mật khẩu không đúng',
//         })
//       } else {
//         // navigation.goBack()
//         handleLogOut()
//       }
//       return json.movies
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const handleLogOut = async () => {
//     try {
//       const api = serverDomain + '/auth/logout/'
//       const token = await getPreference('UserToken')

//       const response = await fetch(api, {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         params: {
//           token: token,
//         },
//       })
//       removePreference(PreferenceKeys.UserToken)
//       // console.log("removeToken: ", getPreference(PreferenceKeys.UserToken))
//     } catch (error) {
//       alert(error)
//     }
//     navigation.navigate(ScreenNames.loginScreen)
//   }

  return (
    <View style={styles.wrapperChangePass}>
      <View style={styles.inputItem}>
        {/* <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => ( */}
            <TextInput
              style={styles.formInput}
              placeholder="Mật khẩu hiện tại"
              placeholderTextColor="#8a8b8d"
            //   onBlur={onBlur}
              onChangeText={(t) => {
                // onChange(currentPassword)
                setCurrentPassword(t)
              }}
              value={currentPassword}
            />
        {/* //   )}
        //   name="currentPassword"
        // /> */}
      </View>
      {/* {
    //   errors.currentPassword && 
    (
        <Text style={styles.errorMessage}>
          {errors.currentPassword.message
            ? errors.currentPassword.message
            : 'Vui lòng nhập mật khẩu hiện tại của bạn.'}
        </Text>
      )} */}
      <View style={styles.inputItem}>
        {/* <Controller
          control={control}
          rules={{
            required: true,
            minLength: 6,
            pattern: /[a-z]*[0-9]*[^a-zA-Z0-9]/,
          }}
          render={({ field: { onChange, onBlur, value } }) => ( */}
            <TextInput
              style={styles.formInput}
              placeholder="Mật khẩu mới"
              placeholderTextColor="#8a8b8d"
            //   onBlur={onBlur}
              onChangeText={(t) => {
                // onChange(newPassword)
                setNewPassword(t)
              }}
              value={newPassword}
            />
          {/* )}
          name="newPassword"
        /> */}
      </View>
      {/* {
    //   errors.newPassword && 
      (
        <Text style={styles.errorMessage}>
          Vui lòng nhập mật khẩu mới của bạn.
        </Text>
      )} */}
      <View style={styles.inputItem}>
        {/* <Controller
          control={control}
          rules={{
            required: true,
            validate: (value) => value == newPassword,
          }}
          render={({ field: { onChange, onBlur, value } }) => ( */}
            <TextInput
              style={styles.formInput}
              placeholder="Nhập lại mật khẩu mới"
              placeholderTextColor="#8a8b8d"
            //   onBlur={onBlur}
              onChangeText={(t) => {
                // onChange(repeatPassword)
                setRepeatPassword(t)
              }}
              value={repeatPassword}
            />
          {/* )}
          name="repeatPassword"
        /> */}
      </View>
      {/* {
    //   errors.repeatPassword && 
      (
        <Text style={styles.errorMessage}>
          Bạn phải nhập một mật khẩu hai lần để xác nhận.
        </Text>
      )} */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.buttonUpdate}
          onPress={handleChangePassword}
        >
          <Text style={styles.textButtonUpdate}>Cập nhật mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonCancel}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textButtonCancel}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChangePassword

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
