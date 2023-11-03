/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLoading: boolean;
  site: SiteData | null;
}

export interface SiteData {
  logo: string;
  support_email: string;
  support_number: string;
  address: string;
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  about_us: string;
}

const initialState: AuthState = {
  isLoading: true,
  site: null
};

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSiteData(state, action: PayloadAction<SiteData>) {
      state.site = action.payload;
    }
  }
});

export const { setIsLoading, setSiteData } = siteSlice.actions;

export default siteSlice.reducer;
