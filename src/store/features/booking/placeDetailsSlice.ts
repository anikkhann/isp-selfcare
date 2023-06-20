/* eslint-disable @typescript-eslint/no-explicit-any */
import AppAxios from "@/services/AppAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface PlaceDetailsState {
  isLoading: boolean;
  item: ItemDetails | null;
  error: any;
}

interface ItemDetails {
  id: number;
  name: string;
  slug: string;
  location: string;
  latitude: string;
  longitude: string;
  short_description: string;
  long_description: string;
  is_active: number;
  is_featured: number;
  rules: any;
  facilities: string;
  category_id: number;
  category: object | null;
  booking_partner_id: number;
  booking_partner: object | null;
  slots: Slot[];
  slots_count: any;
  image: string;
  images: object[];
  created_at: string;
  updated_at: string;
}

interface Slot {
  slot: any;
  id: number;
  name: string;
  booking_partner_id: number;
  discount: number;
  is_active: boolean;
  status: string;
  price_after_discount: number;
  price: number;
  minimum_booking: number;
}

interface PlaceParam {
  id: string | number;
  date: string | null;
}

const initialState: PlaceDetailsState = {
  isLoading: false,
  item: null,
  error: null
};

export const getPlaceDetails = createAsyncThunk(
  "placeDetails/getPlaceDetails",
  async (param: PlaceParam) => {
    try {
      const { data } = await AppAxios.get(
        `/booking-place-details/${param.id}?date=${param.date}`
      );
      return data;
    } catch (error: any) {
      console.log(error);
      return error.response;
    }
  }
);

const placeDetailsSlice = createSlice({
  name: "placeDetails",
  initialState,
  reducers: {
    removeItemData(state) {
      state.item = null;
    },
    setItemData(state, action) {
      state.item = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(getPlaceDetails.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getPlaceDetails.fulfilled, (state, { payload }) => {
      state.item = payload.data.item;
      state.isLoading = false;
    });
    builder.addCase(getPlaceDetails.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.item = null;
    });
  }
});

export const { removeItemData } = placeDetailsSlice.actions;

export default placeDetailsSlice.reducer;
