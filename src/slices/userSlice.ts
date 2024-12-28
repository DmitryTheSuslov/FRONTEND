import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    date_joined: Date;
    // Дополнительные поля, которые есть в UserSerializer
  } | null;
  isAuthenticated: boolean;
  name: string
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  name: ''
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.name = '';
    },
  },
});

export const { setUser, logoutUser, setName } = userSlice.actions;
export default userSlice.reducer;