import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    token: "",
    userName: "",
    name: "",
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userName = action.payload.userName;
      state.name = action.payload.name;

      console.log(action.payload.token);
      console.log(action.payload.userName);
      console.log(action.payload.name);
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = "";
      state.userName = "";
      state.name = "";
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
