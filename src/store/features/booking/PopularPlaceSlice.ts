/* eslint-disable @typescript-eslint/no-explicit-any */
import AppAxios from "@/services/AppAxios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PopularState {
  isLoading: boolean;
  items: object | null;
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
}

interface PopularParam {
  category: string | number | null | undefined;
  name: string | number | null | undefined;
  date: string | null;
  location: string | number | null | undefined;
  latitude: number | null;
  longitude: number | null;
  per_page: number;
  page: number;
}

const initialState: PopularState = {
  isLoading: true,
  items: [],
  total: 0,
  perPage: 0,
  currentPage: 0,
  lastPage: 0
};

export const getPopularPlaces = createAsyncThunk(
  "popular/getPopularPlaces",
  async (param: PopularParam) => {
    try {
      const { data } = await AppAxios.get(
        `/search-web-booking?category_id=${param.category}&date=${param.date}&latitude=${param.latitude}&longitude=${param.longitude}&per_page=${param.per_page}&page=${param.page}`
      );
      return data;
    } catch (error: any) {
      console.log(error);
      return error.response;
    }
  }
);

const PopularPlaceSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setData(state, action: PayloadAction<any>) {
      state.items = action.payload.data;
      state.total = action.payload.total;
      state.perPage = action.payload.per_page;
      state.currentPage = action.payload.current_page;
      state.lastPage = action.payload.last_page;
    }
  }
});

export const { setIsLoading, setData } = PopularPlaceSlice.actions;

export default PopularPlaceSlice.reducer;
