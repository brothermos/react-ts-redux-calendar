import { RoomBooking } from "../app-types/room-booking.type";
import { AxiosResponse, http } from "./http.service";

export async function getRoomBooking(): Promise<AxiosResponse<
   RoomBooking,
   any
> | null> {
   return await http.get<RoomBooking>(
      "https://api.codingthailand.com/api/events"
   );
}
