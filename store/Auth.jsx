import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userId: null,
  bearerToken: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.bearerToken = action.payload.token;
    },
    logoutSuccess(state) {
      state.isLoggedIn = false;
      state.userId = null;
      state.bearerToken = null;
    }
  }
});
console.log(initialState.userId);
console.log(initialState.bearerToken);
export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
