import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  hasError: false,
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
};

// slicer
const NAME = 'Auth';
export const AuthSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    loginFetch: (state, action) => {
      state.isLoading = true
      state.hasError = false
    },
    loginSuccess: (state, action) => {
      const {accessToken, refreshToken} = action.payload
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.isLoggedIn = true
      state.isLoading = false
      state.hasError = false
    },
    loginFailed: (state, action) => {
      state.isLoading = false
      state.hasError = true
      state.error = 'Login failed. Please use the correct credential.'
    },
    logout: (state, action) => {
      state.isLoggedIn = false
      state.accessToken = null
      state.refreshToken = null
    }
  },
});

// selectors
export const authStateSelector = state => state?.auth || {}

// actions
export const {
  loginFetch,
  loginSuccess,
  loginFailed,
  logout
} = AuthSlice.actions;

export default AuthSlice.reducer;
