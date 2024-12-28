import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/api";
import { T_Address } from "src/modules/types";

export const fetchAddressById = createAsyncThunk<T_Address, string, { rejectValue: string }>(
  "address/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.addresses.addressesRead(id);
      return response.data as T_Address;
    } catch (error) {
      console.error("Ошибка при получении данных аудитории:", error);
      return rejectWithValue("Не удалось загрузить данные аудитории.");
    }
  }
);