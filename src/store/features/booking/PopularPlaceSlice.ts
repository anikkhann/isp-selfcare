/* eslint-disable @typescript-eslint/no-explicit-any */
import AppAxios from "@/services/AppAxios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PopularState {
  isLoading: boolean;
  items: object[] | null;
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  error: any;
}

interface PopularParam {
  per_page: number;
  page: number;
}

const initialState: PopularState = {
  isLoading: true,
  items: [],
  total: 0,
  perPage: 0,
  currentPage: 0,
  lastPage: 0,
  error: null
};

export const getPopularPlaces = createAsyncThunk(
  "popular/getPopularPlaces",
  async (param: PopularParam) => {
    try {
      const { data } = await AppAxios.get(
        `/web-popular-booking?&per_page=${param.per_page}&page=${param.page}`
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
    }
  },
  extraReducers: builder => {
    builder.addCase(getPopularPlaces.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getPopularPlaces.fulfilled, (state, { payload }) => {
      state.items = payload.data.places;
      state.total = payload.meta.total;
      state.perPage = payload.meta.per_page;
      state.currentPage = payload.meta.current_page;
      state.lastPage = payload.meta.last_page;
      state.isLoading = false;
    });
    builder.addCase(getPopularPlaces.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.items = [];
      state.total = 0;
      state.perPage = 0;
      state.currentPage = 0;
      state.lastPage = 0;
      state.error = payload;
    });
  }
});

export const { setIsLoading } = PopularPlaceSlice.actions;

export default PopularPlaceSlice.reducer;
