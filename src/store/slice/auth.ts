import { createSlice } from "@reduxjs/toolkit";

export type initialStateType = {
  userToken: string;
};

const initialState: initialStateType = {
  userToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserToken(state, action) {
      state.userToken = action.payload;
    },
  },
});

export const { setUserToken } = authSlice.actions;
