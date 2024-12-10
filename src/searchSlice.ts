import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    addressName: string;
}

const initialState: SearchState = {
    addressName: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setAddressName(state, action: PayloadAction<string>) {
            state.addressName = action.payload;
        },
    },
});

export const { setAddressName } = searchSlice.actions;
export default searchSlice.reducer;