import { createContext } from 'react';

export const CalendarContext = createContext({
    setAppointment: () => {},
    openModal: () => {},
    appointments: [],
    month: {},
    year: "",
});