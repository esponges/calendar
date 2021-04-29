import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CalendarContext } from "./CalendarContext";
import { v4 as uuidv4 } from "uuid";

const DayCell = ({ dayData }) => {
  const [todayAppointments, setTodayAppointments] = useState({});
  const { day, actualMonth } = dayData;

  const context = useContext(CalendarContext);
  const { appointments, monthName, year } = context;

  const handleDoubleClick = (day, actualMonth, e) => {
    context.openModal(day, actualMonth, e);
  };

  useEffect(() => {
    if (appointments) {
      const filteredAppointments = appointments.filter(
        (ap) => ap.day === day && ap.month === monthName && ap.year === year
      );
      setTodayAppointments(filteredAppointments);
    }
  }, []);

  return (
    <td
      id="cell-day-td"
      onDoubleClick={(e) => handleDoubleClick(day, actualMonth, e)}
      key={uuidv4()}
      className={actualMonth ? "white-background" : "dark-background"}
    >
      <p id="cell-day">{day}</p>
      <ul id="cell-day-event-grp">
        {todayAppointments.length > 0 &&
          actualMonth &&
          todayAppointments.map((appointment, i) => {
            return (
              <li key={uuidv4()}>
                <Button
                  variant="outline-info"
                  id="appointment-btn"
                >
                  {appointment.details}
                </Button>
              </li>
            );
          })}
      </ul>
    </td>
  );
};

export default DayCell;
