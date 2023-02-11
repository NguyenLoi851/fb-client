import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    register: {},
    navigation: "",
    post:""
  },
  reducers: {
    editPost(state, action) {
      state.post = action.payload
    },
    addUser(state, action) {
      state.user = action.payload;
    },
    changeToken(state, action) {
      state.user.user.token = action.payload;
    },
    addName(state, action) {
      state.register = { ...state.register, name: action.payload };
    },
    addDate(state, action) {
      state.register = { ...state.register, date: action.payload }
    },
    addEmail(state, action) {
      state.register = { ...state.register, email: action.payload }
    },
    addPhone(state, action) {
      state.register = { ...state.register, phone: action.payload }
    },
    navigate(state, action){
      state.navigation = action.payload
    }
  },
});

// export const registerInfoSlice = createSlice({
//   name: "register",
//   initialState: {
//     user: {},
//   },
//   reducers: {
//     addName(state, action) {
//       state.user = { ...state.user, name: action.payload };
//     },
//     addDate(state, action) {
//       state.user = { ...state.user, date: action.payload }
//     }
//   }
// })

export default userSlice.reducer;
export const {editPost, addUser, addDate, addName, addEmail, addPhone, navigate, changeToken } = userSlice.actions;
// export const { addDate, addName } = registerInfoSlice.actions;
