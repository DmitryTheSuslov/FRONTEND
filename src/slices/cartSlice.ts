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
  status: number;
  addresses: CartAddress[]; 
  loading: boolean;
  error: string | null;
  month: number | null;
}

const initialState: CartState = {
  addressesCount: 0,
  draftId: null,
  cartItems: [],
  addresses: [],
  month: null,
  loading: false,
  error: null,
  status: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.addressesCount = action.payload;
    },
    decCartCount: (state, action: PayloadAction<number>) => {
      state.addressesCount = state.addressesCount - 1;
    },
    resetCartCount: (state) => {
      state.addressesCount = 0;
      state.draftId = null;
      state.cartItems = [];
      state.status = 0;
      state.month = 0;
    },
    setDraftId: (state, action: PayloadAction<string>) => {
      state.draftId = action.payload;
    },
    setMonth: (state, action: PayloadAction<number>) => {
      state.month = action.payload;
      console.log(state.month)
    },
    setStatus: (state, action: PayloadAction<number>) => {
      state.status = action.payload;
    },
    setCartItems: (state, action: PayloadAction<CartAddress[]>) => {
      state.cartItems = action.payload
      state.addressesCount = state.cartItems.length;
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

export const { setCartCount, resetCartCount, setDraftId, setCartItems, removeCartItem, decCartCount, setStatus, setMonth } =
  cartSlice.actions;

export default cartSlice.reducer;