const data = [
  {
    details: "",
    day: 6,
    month: "June",
    year: 2021,
  },
];

const newData = {
    "details": "",
    "day": 15,
    "month": "September",
    "year": 2021
}

const setNewData = (data, newData) => {
    return newArrayOfData = [...data, newData];

}

console.log(setNewData(data, newData));
console.log(data);