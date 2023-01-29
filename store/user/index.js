import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    register: {},
  },
  reducers: {
    addUser(state, action) {
      state.user = action.payload;
    },
    addName(state, action) {
      state.register = { ...state.register, name: action.payload };
    },
    addDate(state, action) {
      state.register = { ...state.register, date: action.payload }
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
export const { addUser, addDate, addName } = userSlice.actions;
// export const { addDate, addName } = registerInfoSlice.actions;
