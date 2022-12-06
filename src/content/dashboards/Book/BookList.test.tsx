import { fireEvent, render } from "@testing-library/react";
import BookList from "./BookList";

const makeSut = () => {
  return render(<BookList />);
};

describe("<App />", () => {
  test("Should render ul", () => {
    const { container, getByText } = makeSut();

    fireEvent.click(getByText(/Show Data/));

    expect(container.querySelector("ul")).toBeInTheDocument();
  });
});