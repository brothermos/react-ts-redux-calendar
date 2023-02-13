import "react-big-calendar/lib/css/react-big-calendar.css";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux-toolkit/hooks";
import {
   getRoomBookingThunk,
   selectRoomBookingState,
} from "../../redux-toolkit/room/room-slice";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { th } from "date-fns/locale";
import { Event } from "../../app-types/room-booking.type";

const locales = {
   "th-TH": th,
};

const localizer = dateFnsLocalizer({
   format,
   parse,
   startOfWeek,
   getDay,
   locales,
});

function DashboardHome() {
   const dispatch = useAppDispatch();
   const { roomBooking } = useAppSelector(selectRoomBookingState);

   useEffect(() => {
      dispatch(getRoomBookingThunk());
   }, []);

   const onSelectEvent = (calEvent: any) => {
      // format
      let data = {
         id: calEvent.id,
         title: calEvent.title,
         start: format(Date.parse(calEvent.start), "dd MMM yyy HH:mm:ss"),
         end: format(Date.parse(calEvent.end), "dd MMM yyy HH:mm:ss"),
         createdBy: calEvent.created_by,
      };
      alert(JSON.stringify(calEvent));
   };

   let myEvents = roomBooking?.events.map((item: Event) => {
      return {
         id: item.id,
         title: item.title,
         start: new Date(item.start),
         end: new Date(item.end),
         createdBy: item.created_by,
      };
   });
   return (
      <>
         <h1>รายการจองห้องประชุมทั้งหมด</h1>
         <Calendar
            culture="th-TH"
            localizer={localizer}
            events={[...(myEvents != undefined ? myEvents : [])]}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            onSelectEvent={onSelectEvent}
            views={["month", "agenda", "day", "week"]}
            formats={{
               dateFormat: "dd",
               monthHeaderFormat: "dd MM yyy",
               timeGutterFormat: "HH:mm",
            }}
         />
      </>
   );
}

export default DashboardHome;
