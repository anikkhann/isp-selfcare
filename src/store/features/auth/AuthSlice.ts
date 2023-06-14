/* eslint-disable @typescript-eslint/no-explicit-any */
import AppAxios from "@/services/AppAxios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";

interface AuthState {
  isLoading: boolean;
  isInitialized: boolean;
  isVerified: boolean;
  SendOtp: boolean;
  phone: string | null;
  isLoggedIn: boolean;
  user: object | null;
  error: any;
}

export const getUserInfo = createAsyncThunk("auth/getUserInfo", async () => {
  try {
    const { data } = await AppAxios.get("/user");
    return data.data;
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
});

const initialState: AuthState = {
  isLoading: true,
  isInitialized: false,
  isVerified: false,
  SendOtp: false,
  phone: null,
  isLoggedIn: false,
  user: null,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setIsVerified: (state, action: PayloadAction<boolean>) => {
      state.isVerified = action.payload;
    },
    setSendOtp: (state, action: PayloadAction<boolean>) => {
      state.SendOtp = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },

    logout: state => {
      state.isLoggedIn = false;

      state.user = null;
      Cookies.remove("token");
    }
  },
  extraReducers: builder => {
    builder.addCase(getUserInfo.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    });
    builder.addCase(getUserInfo.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.user = null;
    });
  }
});

export const { setIsLoading, setInitialized, setIsLoggedIn, logout } =
  authSlice.actions;

export default authSlice.reducer;
