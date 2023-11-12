import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "authentification",
  initialState: {
    isConnected: null,
    token: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isConnected = true;
      state.token = action.payload.token;
    },
    loginFailure: (state) => {
      state.isConnected = false;
      state.token = null;
    },
  },
});

export const { loginSuccess, loginFailure } = loginSlice.actions;
export default loginSlice.reducer;
