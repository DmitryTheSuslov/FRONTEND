import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/api";
import { setCartCount, setDraftId, setCartItems } from "src/slices/cartSlice";

// Создаем Thunk для загрузки аудиторий
export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async (name: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.addresses.addressesSearchList({name});
      const data = response.data;

      // Обновляем состояние через другие экшены
      // dispatch(setCartCount(data.addresses_count || 0));
      dispatch(setDraftId(data.draft_fixation || null));
      // dispatch(setCartItems(data.addresses || []));

      return data.addresses; // Возвращаем список аудиторий
    } catch (error) {
      console.error("Ошибка при загрузке аудиторий:", error);
      return rejectWithValue("Не удалось загрузить данные аудиторий");
    }
  }
);