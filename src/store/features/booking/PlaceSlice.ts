/* eslint-disable @typescript-eslint/no-explicit-any */
import AppAxios from "@/services/AppAxios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PlaceState {
  isLoading: boolean;
  items: object[];
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  error: any;
}

interface PlaceParam {
  category: string | number | null | undefined;
  name: string | number | null | undefined;
  date: string | null;
  location: string | number | null | undefined;
  latitude: number | null;
  longitude: number | null;
  per_page: number;
  page: number;
}

const initialState: PlaceState = {
  isLoading: true,
  items: [],
  total: 0,
  perPage: 0,
  currentPage: 0,
  lastPage: 0,
  error: null
};

export const getPlacesList = createAsyncThunk(
  "place/getPlacesList",
  async (param: PlaceParam) => {
    try {
      const { data } = await AppAxios.get(
        `/search-web-booking?category_id=${param.category}&name=${param.name}&date=${param.date}&latitude=${param.latitude}&longitude=${param.longitude}&per_page=${param.per_page}&page=${param.page}`
      );
      return data;
    } catch (error: any) {
      console.log(error);
      return error.response;
    }
  }
);

const PlaceSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(getPlacesList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getPlacesList.fulfilled, (state, { payload }) => {
      // console.log(payload);
      state.items = payload.data.places;
      state.total = payload.meta.total;
      state.perPage = payload.meta.per_page;
      state.currentPage = payload.meta.current_page;
      state.lastPage = payload.meta.last_page;
      state.isLoading = false;
    });
    builder.addCase(getPlacesList.rejected, (state, { payload }) => {
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

export const { setIsLoading } = PlaceSlice.actions;

export default PlaceSlice.reducer;
