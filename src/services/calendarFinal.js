const uuid = require('uuid');

const getCalendar = (day, month, year) => {
  const lastMonthDays = getLastMonth(month, year);
  const actualMonthDays = getActualMonth(month, year);
  const nextMonthDays = getNextMonth(lastMonthDays, actualMonthDays);
  const calendar = [...lastMonthDays, ...actualMonthDays, ...nextMonthDays];
  const arrangedCalendar = chunkByWeek(calendar);

  return arrangedCalendar;
};

const getLastMonth = (month, year) => {
  const actualMonthStartDay = new Date(year, month - 1).getDay();
  let lastMonth = [];
  let lastMonthDays = new Date(year, month - 1, 0).getDate();
  for (i = lastMonthDays; i > lastMonthDays - actualMonthStartDay; i--) {
    lastMonth.unshift([i, false]);
  }
  return lastMonth;
};

let i = 0;

const getActualMonth = (month, year) => {
  const actualMonthDays = new Date(year, month, 0).getDate();
  let actualMonthArray = [];
  for (i = 0; i < actualMonthDays; i++) {
    actualMonthArray.push([i + 1, true]);
  }
  return actualMonthArray;
};

const getNextMonth = (lastMonth, actualMonth) => {
  const partialCalendar = [...lastMonth, ...actualMonth];
  /* 42 days inside the calendar table */
  const nextMonthDays = 42 - partialCalendar.length;
  const getNextMonthArray = actualMonth.slice(0, nextMonthDays);
  const nextMonthArray = getNextMonthArray.map(([key, value]) => [key, false]);
  return nextMonthArray;
};

const chunkByWeek = (calendar) => {
  const chunkedCalendar = [];
  for (i = 0; i < 42; i += 7) {
    const sliced = calendar.slice(i, i + 7);
    const slicedObj = sliced.map(([key, value]) => {
      return {
        day: key,
        actualMonth: value,
        id: uuid.v4(),
      };
    });
    chunkedCalendar.push(slicedObj);
  }
  return chunkedCalendar;
};

export default getCalendar;
