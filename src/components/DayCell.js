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
    //   console.log('day isss ', day, ' and month name is ', monthName, 'apoi are', appointments);
    if (appointments) {
      const filteredAppointments = appointments.filter(
        (ap) => ap.day === day && ap.month === monthName && ap.year === year
      );
      //   filteredAppointments.length > 0 && console.log('and apoi filtered are ', filteredAppointments);
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
      {/* {day === 13 &&
        console.log(
          appointments,
          monthName,
          actualMonth,
          "todays appointmens ",
          todayAppointments
        )} */}
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
