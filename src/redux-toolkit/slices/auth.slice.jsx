import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: {
      fullName: null,
      role: null,
      isLogin: false,
    },
  },
  reducers: {
    setInfo: (state, actions) => {
      state.currentUser = { ...state.currentUser, ...actions.payload };
    },
  },
});
export const { setInfo } = authSlice.actions;
export default authSlice;
