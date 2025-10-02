import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  id: string;
  userName: string;
  names: string;
  email: string;
  nationalId: string;
  dateOfBirth: string;
  customerCode:string;
}

export interface AuthenticationState {
  authToken: string | null;
  userData: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthenticationState = {
  authToken: null,
  userData: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    loginSuccess(state, action: PayloadAction<{ token: string; userData: UserData }>) {
      state.authToken = action.payload.token;
      state.userData = action.payload.userData;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    logout(state) {
      state.authToken = null;
      state.userData = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    }
  }
});

export const {
  setLoading,
  setError,
  loginSuccess,
  logout,
  clearError
} = authSlice.actions;

export default authSlice.reducer;
