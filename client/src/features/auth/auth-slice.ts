import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AuthState from './types/auth-state-interface';

// Try to load auth state from localStorage
const storedToken = localStorage.getItem('authToken');
let initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};
if (storedToken) {
  initialState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'), 
    token: storedToken,
    isAuthenticated: true,
  }
}

// Auth slice (React Redux)
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: { username: string; email: string }; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },
    updateUser: (state, action: PayloadAction<{ username: string; email: string }>) => {
      if (state.user) {
        state.user.username = action.payload.username;
        state.user.email = action.payload.email;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;