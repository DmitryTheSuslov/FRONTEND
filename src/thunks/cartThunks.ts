import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/api";
import { removeCartItem, resetCartCount, setCartCount } from "src/slices/cartSlice";

// Thunk для удаления аудитории из корзины
export const deleteAddressFromCart = createAsyncThunk<
  void,
  { fixationId: number; addressId: number },
  { rejectValue: string }
>("cart/deleteAddress", async ({ fixationId, addressId }, { dispatch, rejectWithValue }) => {
  try {
    const response = await api.fixations.fixationsDeleteAddressDelete(String(fixationId), String(addressId));

    if (response.status === 200 || response.status === 204) {
      dispatch(removeCartItem(addressId));
      dispatch(setCartCount(-1)); // Уменьшаем счетчик
    } else {
      return rejectWithValue("Ошибка при удалении аудитории из корзины.");
    }
  } catch (err) {
    return rejectWithValue("Ошибка при удалении аудитории из корзины.");
  }
});

// Thunk для удаления всей корзины
export const deleteCart = createAsyncThunk<
  void,
  { fixationId: number },
  { rejectValue: string }
>("cart/deleteCart", async ({ fixationId }, { dispatch, rejectWithValue }) => {
  try {
    const response = await api.fixations.fixationsDeleteDelete(String(fixationId));

    if (response.status === 200) {
      dispatch(resetCartCount()); // Сбрасываем состояние корзины
    } else {
      return rejectWithValue("Ошибка при удалении корзины.");
    }
  } catch (err) {
    return rejectWithValue("Ошибка при удалении корзины.");
  }
});

// Thunk для оформления заказа
export const submitOrder = createAsyncThunk<
  void,
  { fixationId: number },
  { rejectValue: string }
>("cart/submitOrder", async ({ fixationId }, { rejectWithValue }) => {
  try {
    const response = await api.fixations.fixationsUpdateStatusUserUpdate(String(fixationId), {});

    if (response.status !== 200) {
      return rejectWithValue("Ошибка при оформлении заказа.");
    }
  } catch (err) {
    return rejectWithValue("Ошибка при оформлении заказа.");
  }
});