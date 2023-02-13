export interface RoomBooking {
    events: Event[];
}

export interface Event {
    id:         number;
    title:      string;
    start:      string;
    end:        string;
    created_by: string;
}
