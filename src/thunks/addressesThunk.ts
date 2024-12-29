import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/api";
import { setCartCount, setDraftId, setCartItems } from "src/slices/cartSlice";


export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async (name: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.addresses.addressesSearchList({name});
      const data = response.data;


      dispatch(setDraftId(data.draft_fixation || null));

      return data.addresses;
    } catch (error) {
      console.error("Ошибка при загрузке адресов:", error);
      return rejectWithValue("Не удалось загрузить данные адресов");
    }
  }
);