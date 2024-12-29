import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "src/api";
import { removeCartItem, resetCartCount, setCartCount, decCartCount, setCartItems, setStatus, setMonth } from "src/slices/cartSlice";


const months = {
  0: "Январь",
  1: "Февраль",
  2: "Март",
  3: "Апрель",
  4: "Май",
  5: "Июнь",
  6: "Июль",
  7: "Август",
  8: "Сентябрь",
  9: "Октябрь",
  10: "Ноябрь",
  11: "Декабрь"
};

const monthNumbers = {
  "Январь": 0,
  "Февраль": 1,
  "Март": 2,
  "Апрель": 3,
  "Май": 4,
  "Июнь": 5,
  "Июль": 6,
  "Август": 7,
  "Сентябрь": 8,
  "Октябрь": 9,
  "Ноябрь": 10,
  "Декабрь": 11
};

export const deleteAddressFromCart = createAsyncThunk<
  void,
  { fixationId: number; addressId: number },
  { rejectValue: string }
>("cart/deleteAddress", async ({ fixationId, addressId }, { dispatch, rejectWithValue }) => {
  try {
    const response = await api.fixations.fixationsDeleteAddressDelete(String(fixationId), String(addressId));

    if (response.status === 200 || response.status === 204) {
      dispatch(removeCartItem(addressId));
      dispatch(decCartCount(-1)); // Уменьшаем счетчик
    } else {
      return rejectWithValue("Ошибка при удалении адреса из корзины.");
    }
  } catch (err) {
    return rejectWithValue("Ошибка при удалении адреса из корзины.");
  }
});

export const updateMonth = createAsyncThunk<
  void,
  {fixationId: number; month: number },
  { rejectValue: string }
>("cart/updateMonth", async ({fixationId, month}, { dispatch, rejectWithValue }) => {
  try {
    console.log("update");
    console.log("month");
    const response = await api.fixations.fixationsUpdateUpdate(String(fixationId), {"month": month});
    console.log(response);
  } catch (err) {
    return rejectWithValue("Ошибка при обновлении месяца");
  }
});


export const deleteCart = createAsyncThunk<
  void,
  { fixationId: number },
  { rejectValue: string }
>("cart/deleteCart", async ({ fixationId }, { dispatch, rejectWithValue }) => {
  try {
    const response = await api.fixations.fixationsDeleteDelete(String(fixationId));

    if (response.status === 200) {
      dispatch(resetCartCount()); 
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
>("cart/submitOrder", async ({ fixationId }, {dispatch, rejectWithValue }) => {
  try {
    const response = await api.fixations.fixationsUpdateStatusUserUpdate(String(fixationId), {});
    
    if (response.status !== 200) {
      return rejectWithValue("Ошибка при оформлении заказа.");
    }
    dispatch(resetCartCount());
  } catch (err) {
    return rejectWithValue("Ошибка при оформлении заказа.");
  }
});

export const fetchCartAddresses = createAsyncThunk(
  "addresses/fetchCartAddresses",
  async (name: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.addresses.addressesSearchList({});
      const data = response.data;
      const draftId = data.draft_fixation;
      console.log(draftId);
      // if(draftId === null){
      //   console.log("ok");
      //   return 0;
      // };
      const response2 = await api.fixations.fixationsRead(draftId);
      const data2 = response2.data;
      const addresses = data2.addresses;
      // Обновляем состояние через другие экшены
      // dispatch(setCartCount(data.addresses_count || 0));
      // dispatch(setDraftId(data.draft_fixation || null));
      dispatch(setCartItems(addresses));
      
        // dispatch(setCartItems(data.addresses || []));

      return data2.status;
    } catch (error) {
      console.error("Ошибка при загрузке адресов:", error);
      return rejectWithValue("Не удалось загрузить данные адресов");
    }
  }
);

export const fetchCartFixation = createAsyncThunk(
  "fixations/fetchFix",
  async (fixId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.fixations.fixationsRead(fixId);
      const data = response.data;
      const addresses = data.addresses;
      // Обновляем состояние через другие экшены
      // dispatch(setCartCount(data.addresses_count || 0));
      // dispatch(setDraftId(data.draft_fixation || null));
      if (data.status != 5){
        await dispatch(setCartItems(addresses));
        await dispatch(setMonth(data.month));
        // await dispatch(setMonth(data.month));
        console.log(data.status);
                // dispatch(setCartItems(data.addresses || []));
      }
      await dispatch(setStatus(data.status));
      return '';
    } catch (error) {
      console.error("Ошибка при загрузке адресов:", error);
      return rejectWithValue("Не удалось загрузить данные адресов");
    }
  }
);