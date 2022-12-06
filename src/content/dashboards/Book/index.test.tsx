import { Button, ButtonProps } from "./button";
import { fireEvent, render } from "@testing-library/react";

const makeSut = (props: Partial<ButtonProps>) => {
  return render(<BookList  onClick={jest.fn()} {...props} />);
};

describe("<BookList />", () => {
  test("Should render BookList correctly", () => {
    const { getByText } = makeSut({ label: "BookList" });

    expect(getByText(/BookList/)).toBeInTheDocument();
  });

  test("Should call onClick successfully", () => {
    const spy = jest.fn();

    const { getByText } = makeSut({ onClick: spy });

    fireEvent.click(getByText(/grid/));

    expect(spy).toHaveBeenCalled();
  });
});