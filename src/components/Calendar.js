import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";
import Header from "./Header";

import getCalendar from "../services/calendarFinal";
import months from "../services/months";
import { CalendarContext } from "./CalendarContext";
import DayCellModal from "./DayCellModal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";

const actualMonthValue = new Date().getMonth() + 1;
const todayValue = new Date().getDay();
const actualYear = new Date().getFullYear();
const monthNames = months;

const Calendar = () => {
  const [displayDays, setDisplayDays] = useState({});
  const today = useState(todayValue);
  const [year, setYear] = useState(actualYear);
  const [month, setMonth] = useState({
    value: actualMonthValue,
    name: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dayCellData, setDayCellData] = useState({});
  const [appointments, setAppointments] = useState(
    JSON.parse(window.localStorage.getItem("appointments"))
  );

  const notify = (type = 0) => {
    if ("success") {
      return toast.success("Appointment saved");
    }
    toast.warning("Oops, Server problems!");
  };

  const prepareData = (data) => {
    const storedData = JSON.parse(window.localStorage.getItem("appointments"));
    let newData = [];
    if (storedData === undefined || !storedData) {
      newData = JSON.stringify([data]);
      return newData;
    } else {
      newData = [...storedData, data];
      const parsedNewData = JSON.stringify(newData);
      return parsedNewData;
    }
  };

  const clearLocalStorageData = () => {
      window.localStorage.removeItem("appointments");
      window.location.reload();
  }
  

  const saveAppointment = (data) => {
    try {
      notify("success");
      const encodedNewData = prepareData(data);
      window.localStorage.setItem("appointments", encodedNewData);
      setAppointments(JSON.parse(encodedNewData));
    } catch (error) {
      console.error(error);
      notify("warning");
    }
  };

  const openModal = (info = 0, actualMonth) => {
    setModalIsOpen(true);
    let data = {
      day: !actualMonth ? actualMonth : info,
      month: !actualMonth ? actualMonth : month.name,
      year: !actualMonth ? actualMonth : year,
    };

    setDayCellData(data);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const filterMonthNames = (monthValue) => {
    const realMonthValue = monthValue - 1;
    const monthName = monthNames[realMonthValue].month;
    return monthName;
  };

  const getMonth = (action, e) => {
    e.preventDefault();
    let newYear = year;
    let newMonth = action === "next" ? month.value + 1 : month.value - 1;
    if (newMonth > 12 || newMonth < 1) {
      if (newMonth > 12) {
        newYear = year + 1;
        newMonth = 1;
        setMonth({
          value: newMonth,
          name: filterMonthNames(newMonth),
        });
        setYear(newYear);
      } else {
        newYear = year - 1;
        newMonth = 12;
        setMonth({
          value: newMonth,
          name: filterMonthNames(newMonth),
        });
        setYear(newYear);
      }
    }
    setMonth({
      value: newMonth,
      name: filterMonthNames(newMonth),
    });
    setYear(newYear);
  };

  useEffect(() => {
    setMonth({
      ...month,
      name: filterMonthNames(month.value),
    });
  }, []);

  useEffect(() => {
    const monthData = getCalendar(today, month.value, year);
    setDisplayDays(monthData);
    setAppointments(JSON.parse(window.localStorage.getItem("appointments")));
  }, [month]);

  return (
    <div>
      <CalendarContext.Provider
        value={{
          openModal: openModal,
          appointments: appointments,
          monthName: month.name,
          year: year,
        }}
      >
        <ToastContainer position="top-right" />
        <DayCellModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          dayCellData={dayCellData}
          monthNames={monthNames}
          saveAppointment={saveAppointment}
        />
        <Header month={month.name} year={year} getMonth={getMonth} />
        <TableBody displayData={displayDays} />
      </CalendarContext.Provider>
      <Button
        id="clear-data-btn"
        variant="secondary"
        size="sm"
        onClick={clearLocalStorageData}
      >
        Clear data
      </Button>
      <Button
        id="clear-data-btn"
        variant="secondary"
        size="sm"
        onClick={(e) =>
          console.log(JSON.parse(window.localStorage.getItem("appointments")))
        }
      >
        Log data
      </Button>
    </div>
  );
};

export default Calendar;
