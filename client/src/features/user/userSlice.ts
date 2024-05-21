import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserState, UserType } from "../../types/user.type.";
import { UserAPI } from "../../service/userService/UserAPI";
import { RootState } from "../../app/store";

const initialState: UserState = {
  users: null,
  error: null,
  isLoading: false,
  success: false
};

export const allUsers = createAsyncThunk<
  { message: string; detail: UserType[] },
  undefined,
  { rejectValue: any }
>("users/all", async (_, thunkAPI) => {
  try {
    const response = await UserAPI.getUsers();
    if (response.data.status === false) {
      return thunkAPI.rejectWithValue(response.data.data);
    }
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data)
  }
});


export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    resetUserState: (state) => {
      state.users = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allUsers.pending, (state) => {
        state.users = null;
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(allUsers.fulfilled, (state, action: PayloadAction<{
        message: string;
        detail: UserType[]
      }>) => {
        state.users = action.payload.detail;
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.users = null;
        state.isLoading = false;
        state.success = false;
        state.error = action.payload || "Unknown Error";
      });
  }
});

export const { resetUserState } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;