import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAddresses } from "src/thunks/addressesThunk";

interface CartAddress {
  address_id: number;
  address_name: string;
  area: number;
  photo: string;
}

interface CartState {
  addressesCount: number;
  draftId: string | null;
  cartItems: CartAddress[];
  addresses: CartAddress[]; // Список всех аудиторий
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  addressesCount: 0,
  draftId: null,
  cartItems: [],
  addresses: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.addressesCount = action.payload;
    },
    resetCartCount: (state) => {
      state.addressesCount = 0;
      state.draftId = null;
      state.cartItems = [];
    },
    setDraftId: (state, action: PayloadAction<string>) => {
      state.draftId = action.payload;
    },
    setCartItems: (state, action: PayloadAction<CartAddress[]>) => {
      state.cartItems = action.payload;
    },
    removeCartItem(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.address_id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload; // Сохраняем аудиторий
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCartCount, resetCartCount, setDraftId, setCartItems, removeCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;