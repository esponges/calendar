import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Calendar from "../components/Calendar";

beforeEach(() => {
  render(<Calendar />);
});

afterEach(cleanup);

describe("Calendar", () => {
  it("renders", () => {
    render(<Calendar />);
  });

  it("displays actual month and year", () => {
    const heading = screen.getByRole("heading", { name: /april 2021/i });
    expect(heading).toBeInTheDocument();
  });

  it('displays last month when clicking "back"', () => {
    const backBtn = screen.getByRole("button", { name: /back/i });
    userEvent.click(backBtn);

    waitFor(() => {
      const heading = screen.getAllByRole("heading", { name: /march 2021/i });
      expect(heading).toBeInTheDocument();
    });
  });

  it('displays last month when clicking "next"', () => {
    const nextBtn = screen.getByRole("button", { name: /next/i });
    userEvent.click(nextBtn);

    waitFor(() => {
      const heading = screen.getAllByRole("heading", { name: /may 2021/i });
      expect(heading).toBeInTheDocument();
    });
  });
});
