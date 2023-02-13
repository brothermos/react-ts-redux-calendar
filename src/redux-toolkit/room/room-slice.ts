import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getRoomBooking } from "../../services/room.service";

import { RoomBooking } from "../../app-types/room-booking.type";
import { AxiosError } from "../../services/http.service";

export interface RoomBookingState {
   roomBooking: RoomBooking | null;
}

const initialState: RoomBookingState = {
   roomBooking: null,
};

export const getRoomBookingThunk = createAsyncThunk<RoomBooking, void>(
   "room/getRoomBookingThunkStatus",
   async () => {
      try {
         const response = await getRoomBooking();
         // console.log(response.data);
         return response?.data;
      } catch (error: any) {
         let err: AxiosError<any> = error;
         if (!err.response) {
            throw error;
         }
         return err.response.data;
      }
   }
);

export const roomBookingSlice = createSlice({
   name: "roomBooking",
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(
         getRoomBookingThunk.fulfilled,
         (state, action: PayloadAction<RoomBooking | null>) => {
            state.roomBooking = action.payload;
         }
      );
   },
});

// Action creators are generated for each case reducer function
// export const { updateProfileAction} = authSlice.actions

export const selectRoomBookingState = (state: RootState) =>
   state.roomBookingState;

export default roomBookingSlice.reducer;
