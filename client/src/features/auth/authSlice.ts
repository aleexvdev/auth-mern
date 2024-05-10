import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/user.type.";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: UserType | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  user: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<{ token: string; user: UserType }>) => {
      const { token, user } = action.payload;
      state.isAuthenticated = true;
      state.token = token;
      state.user = user;
    },
    setUnauthenticated: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    }
  },
});

export const { setAuthenticated, setUnauthenticated } = authSlice.actions;
export default authSlice.reducer;