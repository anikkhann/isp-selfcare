/* eslint-disable @typescript-eslint/no-explicit-any */
import AppAxios from "@/services/AppAxios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { SelectProps } from "antd";

interface CategoryState {
  isLoading: boolean;
  categories: SelectProps["options"];
  error: any;
}

const initialState: CategoryState = {
  isLoading: false,
  categories: [],
  error: null
};

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async () => {
    try {
      const { data } = await AppAxios.get(`/web-booking-category`);
      return data.data;
    } catch (error: any) {
      console.log(error);
      return error.response;
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCategories.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      if (payload.items.length > 0) {
        const items = payload.items.map(function (item: {
          id: number;
          name: string;
        }) {
          return { value: item.id, label: item.name };
        });
        state.categories = items;
      }

      state.isLoading = false;
    });
    builder.addCase(getCategories.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
  }
});

export default categorySlice.reducer;
