import React from "react";
import { Table } from "react-bootstrap";
import DayCell from "./DayCell";
import { v4 as uuidv4 } from "uuid";

const TableBody = ({ displayData }) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Table striped bordered responsive="sm">
      <thead>
        <tr>
          {weekDays.length > 0 &&
            weekDays.map((day) => {
              return <th key={day}>{day}</th>;
            })}
        </tr>
      </thead>
      <tbody>
        {displayData.length > 0 &&
          displayData.map((week, i) => {
            return (
              <tr key={uuidv4()}>
                {week.map((d) => {
                  return <DayCell key={d.id} dayData={d} />;
                })}
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default TableBody;
