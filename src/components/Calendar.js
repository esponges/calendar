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
    console.log("is stored Data", storedData, "and dataaa ", data);
    // return console.log(storedData);
    let newData = [];
    if (storedData === undefined || !storedData) {
      console.log("it is undefined!!");
      newData = JSON.stringify([data]);
      return newData;
    } else {
      console.log("it is defined");
      newData = [...storedData, data];
      const parsedNewData = JSON.stringify(newData);
      return parsedNewData;
    }
    // return console.log(newData);
    // const unparsedNewData =
    //   decodedStoredData === undefined
    //     ? [data]
    //     : [decodedStoredData, data];
    // const encodedNewData = JSON.stringify(unparsedNewData);
    // return newData;
  };

  const clearLocalStorageData = () => {
      console.log('clear data!!');
      window.localStorage.removeItem("appointments");
      window.location.reload();
  }
  

  const saveAppointment = (data) => {
    data.month = month.name;
    try {
      notify("success");
    //   console.log("saving appointment with next data ", data);
      const encodedNewData = prepareData(data);
      //   console.log('encoded data new data is ', encodedNewData);
      // //   return console.log(encodedNewData)
    //   console.log("save data now!!");
      window.localStorage.setItem("appointments", encodedNewData);
      console.log("save next local storage data", JSON.parse(encodedNewData));
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
    // const filteredMonth = monthNames.filter((m) => m.index === month.value);
    return monthName;
  };

  const getMonth = (action, e) => {
    e.preventDefault();
    let newYear = year;
    let newMonth = action === "next" ? month.value + 1 : month.value - 1;
    // console.log(`get ${action} month which is ${newMonth}`);
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
    // console.log("first user Effect!!!");
  }, []);

  useEffect(() => {
    const monthData = getCalendar(today, month.value, year);
    setDisplayDays(monthData);
    // console.log("use Effect from calendar, change month or appoi");
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
        <ToastContainer position="top-center" />
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
      {/* <Button
        id="clear-data-btn"
        variant="secondary"
        size="sm"
        onClick={(e) =>
          window.localStorage.setItem(
            "appointments",
            JSON.stringify([
              {
                details: "",
                day: 6,
                month: "June",
                year: 2021,
              },
              {
                details: "",
                day: 6,
                month: "June",
                year: 2021,
              },
            ])
          )
        }
      >
        set dummy data 2 objects
      </Button>
      <Button
        id="clear-data-btn"
        variant="secondary"
        size="sm"
        onClick={(e) =>
          window.localStorage.setItem(
            "appointments",
            JSON.stringify([
              {
                details: "",
                day: 6,
                month: "June",
                year: 2021,
              },
            ])
          )
        }
      >
        set dummy data 1 object
      </Button> */}
    </div>
  );
};

export default Calendar;
