import { cleanup, getByRole, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Calendar from "../components/Calendar";
import months from '../services/months';

beforeEach(() => {
  render(
    <Calendar />
  );
});

afterEach(cleanup);

const actualMonthValue = new Date().getMonth();
const getMonthName = (offset = 0) => {
  const monthName = months[actualMonthValue + offset].month;
    return monthName;
  };
const monthName = getMonthName();
const actualYear = new Date().getFullYear();


describe("Calendar", () => {
  it("renders", () => {
    render(<Calendar />);
  });

  it("displays actual month and year", () => {
    const heading = screen.getByRole("heading", { name: `${monthName} ${actualYear}` });
    expect(heading).toBeInTheDocument();
  });

  it('displays last month when clicking "back"', () => {
    const lastMonthName = getMonthName(-1);

    const backBtn = screen.getByRole("button", { name: /back/i });
    userEvent.click(backBtn);

    waitFor(() => {
      const heading = screen.getAllByRole("heading", { name: `${lastMonthName} ${year}` });
      expect(heading).toBeInTheDocument();
    });
  });

  it('displays last month when clicking "next"', () => {
    const nextMonthName = getMonthName(1);

    const nextBtn = screen.getByRole("button", { name: /next/i });
    userEvent.click(nextBtn);

    waitFor(() => {
      const heading = screen.getAllByRole("heading", { name: `${nextMonthName} ${year}` });
      expect(heading).toBeInTheDocument();
    });
  });

  it('renders all the day grid', () => {
    const todayValue = new Date().getDay();
    const actualMonthValue = new Date().getMonth() + 1;
    const actualYear = new Date().getFullYear();
    render(<Calendar today={todayValue} month={actualMonthValue} year={actualYear} />);
    waitFor(() => {
      const number = Math.floor((Math.random() * 28) + 1);
      const DayCell = getByRole('paragraph', { name: `${number}`});
      expect(DayCell).toBeInTheDocument();
    });
  });
});
