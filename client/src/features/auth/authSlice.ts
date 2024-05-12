import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/user.type.";
import { RootState } from "../../app/store";
import { SignInFormData } from "../../types/auth.type";
import { AuthAPI } from "../../service/authService/AuthAPI";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: UserType | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  user: null,
  error: null,
  isLoading: false
};

export const signIn = createAsyncThunk<{ message: string; detail: { user: UserType; token: string } }, SignInFormData, { rejectValue: string }>("auth/sign-in", async (data, thunkAPI) => {
  try {
    const response = await AuthAPI.signInAuth(data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Authentication Error");
  }
});


export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      sessionStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        signIn.fulfilled,
        (state, action: PayloadAction<{ message: string; detail: { user: UserType; token: string } }>) => {
          const { detail } = action.payload;
          state.isAuthenticated = true;
          state.token = detail.token;
          state.user = detail.user;
          sessionStorage.setItem('token', detail.token);
        }
      )
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Unknown Error";
      })
  }
});

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;