/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface SearchState {
  isLoading: boolean;
  category: string | number | null | undefined;
  name: any;
  location: any;
  date: dayjs.Dayjs;
  latitude: number | null;
  longitude: number | null;
}

const initialState: SearchState = {
  isLoading: true,
  category: null,
  name: null,
  location: null,
  date: dayjs(),
  latitude: null,
  longitude: null
};

const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setCategory(
      state,
      action: PayloadAction<string | number | null | undefined>
    ) {
      state.category = action.payload;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    setDate(state, action: PayloadAction<dayjs.Dayjs>) {
      state.date = action.payload;
    },
    setLatitude(state, action: PayloadAction<number>) {
      state.latitude = action.payload;
    },
    setLongitude(state, action: PayloadAction<number>) {
      state.longitude = action.payload;
    }
  }
});

export const {
  setIsLoading,
  setCategory,
  setDate,
  setLatitude,
  setLongitude,
  setName,
  setLocation
} = SearchSlice.actions;

export default SearchSlice.reducer;
