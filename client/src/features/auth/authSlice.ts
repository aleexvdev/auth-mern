import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/user.type.";
import { RootState } from "../../app/store";
import { SignInFormData, SignUpFormData } from "../../types/auth.type";
import { AuthAPI } from "../../service/authService/AuthAPI";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: UserType | null;
  error: any | null;
  isLoading: boolean;
  success: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  user: null,
  error: null,
  isLoading: false,
  success: false,
};

export const signIn = createAsyncThunk<
  { message: string; detail: { user: UserType; token: string } },
  SignInFormData,
  { rejectValue: any }
>("auth/sign-in", async (data, thunkAPI) => {
  try {
    const response = await AuthAPI.signInAuth(data);
    if (response.data.status === false) {
      return thunkAPI.rejectWithValue(response.data.data);
    }
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const signUp = createAsyncThunk<
  { message: string; detail: { user: UserType; token: string } },
  SignUpFormData,
  { rejectValue: any }
>("auth/sign-up", async (data, thunkAPI) => {
  try {
    const response = await AuthAPI.signUpAuth(data);
    if (response.data.status === false) {
      return thunkAPI.rejectWithValue(response.data.data);
    }
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const verifyToken = createAsyncThunk<
  { message: string; detail: { user: UserType } },
  { token: string },
  { rejectValue: string }
>("auth/verify-token", async (data, thunkAPI) => {
  try {
    const response = await AuthAPI.verifyToken(data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Token verification error");
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
      state.error = null;
      state.isLoading = false;
      state.success = false;
      localStorage.removeItem("token");
    },
    resetState: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = null;
      state.isLoading = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        signIn.fulfilled,
        (
          state,
          action: PayloadAction<{
            message: string;
            detail: { user: UserType; token: string };
          }>
        ) => {
          const { detail } = action.payload;
          state.isAuthenticated = true;
          state.success = true;
          state.isLoading = false;
          state.token = detail.token;
          state.user = detail.user;
          state.error = null;
          localStorage.setItem("token", detail.token);
        }
      )
      .addCase(
        signIn.rejected,
        (
          state,
          action: PayloadAction<{ message: string; detail: { error: string } }>
        ) => {
          state.isLoading = false;
          state.success = false;
          state.isAuthenticated = false;
          state.token = null;
          state.user = null;
          state.error = action.payload.detail.error || null;
        }
      )
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        signUp.fulfilled,
        (
          state,
          action: PayloadAction<{
            message: string;
            detail: { user: UserType; token: string };
          }>
        ) => {
          const { detail } = action.payload;
          state.isLoading = false;
          state.isAuthenticated = true;
          state.success = true;
          state.token = detail.token;
          state.user = detail.user;
          localStorage.setItem("token", detail.token);
        }
      )
      .addCase(signUp.rejected, 
        (
          state,
          action: PayloadAction<{ message: string; detail: { error: string } }>
        ) => {
        state.isLoading = false;
        state.success = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = action.payload.detail.error || "Error Sign Up";
      })
      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        verifyToken.fulfilled,
        (
          state,
          action: PayloadAction<{ message: string; detail: { user: UserType } }>
        ) => {
          const { detail } = action.payload;
          state.isLoading = false;
          state.user = detail.user;
          state.isAuthenticated = true;
        }
      )
      .addCase(verifyToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Unknown Error";
      });
  },
});

export const { logout, resetState } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
