import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { login, register } from "../../services/auth.service";
import { LoginFormInput } from "../../app-types/login-form-input.type";
import { LoginErrorResponse, LoginResponse } from "../../app-types/login.type";
import { AxiosError } from "axios";
import {
   ErrorRegisterResponse,
   RegisterResponse,
} from "../../app-types/register.type";
import { RegisterFormInput } from "../../app-types/register-form-input.type";

// Define a type for the slice state
export interface AuthState {
   profile: string;
   email: string;
   loginResponse: LoginResponse | null;
   registerResponse: RegisterResponse | null;
}

// ค่าเริ่มต้น
const initialState: AuthState = {
   profile: "John Doe",
   email: "john@gmail.com",
   loginResponse: null,
   registerResponse: null
};

// createAsyncThunk คือ async await ของ typescript
export const loginThunk = createAsyncThunk<
   LoginResponse,
   LoginFormInput,
   { rejectValue: LoginErrorResponse }
>(
   "auth/loginThunkStatus",
   async (user: LoginFormInput, { rejectWithValue }) => {
      try {
         const response = await login(user.email, user.password);
         // localstorage เก็บ token
         localStorage.setItem("token", JSON.stringify(response.data));
         return response.data;
      } catch (error: any) {
         let err: AxiosError<LoginErrorResponse> = error;
         if (!err.response) {
            throw error;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const registerThunk = createAsyncThunk<
   RegisterResponse,
   RegisterFormInput,
   { rejectValue: ErrorRegisterResponse }
>(
   "auth/registerThunkStatus",
   async (user: RegisterFormInput, { rejectWithValue }) => {
      try {
         const response = await register(user.name, user.email, user.password);
         // localStorage.setItem("token", JSON.stringify(response.data));
         return response.data;
      } catch (error: any) {
         let err: AxiosError<ErrorRegisterResponse> = error;
         if (!err.response) {
            throw error;
         }
         return rejectWithValue(err.response.data);
      }
   }
);

export const authSlice = createSlice({
   name: "auth",
   initialState: initialState,
   reducers: {
      // action
      updateProfileAction: (state) => {
         state.profile = "Mary Doe";
         state.email = "john@gmal.com";
      },
   },

   //    // กรณีถ้าต้องใช้ global state ถ้าใช้ unwrap คอมเม้นออกได้เลย
   //    extraReducers: (builder) => {
   //       builder.addCase(
   //          loginThunk.fulfilled,
   //          (state, action: PayloadAction<LoginResponse | null>) => {
   //             state.loginResponse = action.payload;
   //          }
   //       );
   //    },
});

export const { updateProfileAction } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.authState;

export default authSlice.reducer;
