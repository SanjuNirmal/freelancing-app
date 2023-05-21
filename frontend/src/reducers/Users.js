import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: { user: {} },
  reducers: {
    atLogin: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { atLogin } = usersSlice.actions;
export default usersSlice.reducer;