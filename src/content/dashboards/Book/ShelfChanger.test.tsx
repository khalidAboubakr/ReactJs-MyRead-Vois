import { DropdownList, DropdownListProps } from "./dropdown-list";
import { fireEvent, render } from "@testing-library/react";

const labels = {
  hide: "Hide",
  show: "Show"
};

const data = [
  { value: "currentlyReading", label: "currentlyReading" },
  { value: "wantToRead", label: "wantToRead" },
  { value: "read", label: "read" },
  { value: "none", label: "none" },
];

const makeSut = (props: Partial<DropdownListProps>) => {
  return render(
      <DropdownList
          data={data}
          labels={labels}
          onRemoveItem={jest.fn()}
          {...props}
      />
  );
};

describe("<DropdownList />", () => {
  test("Should not render ul component on initial render", () => {
    const { container } = makeSut({});

    expect(container.querySelector("ul")).not.toBeInTheDocument();
  });

  test("Should render ul component when click on button", () => {
    const { container, getByText } = makeSut({});

    fireEvent.click(getByText(labels.show));

    expect(container.querySelector("ul")).toBeInTheDocument();
  });

  test("Should switch button label on click", () => {
    const { getByText } = makeSut({});

    expect(getByText(labels.show)).toBeInTheDocument();

    fireEvent.click(getByText(labels.show));

    expect(getByText(labels.hide)).toBeInTheDocument();
  });

  test("Should render 3 li correctly", () => {
    const { getByText, container } = makeSut({});

    fireEvent.click(getByText(labels.show));

    expect(container.querySelectorAll("li").length).toBe(data.length);
  });

  test("Should call onRemoveItem callback correctly", () => {
    const onRemoveItem = jest.fn();

    const { getByText, getAllByText } = makeSut({ onRemoveItem });

    fireEvent.click(getByText(labels.show));

    fireEvent.click(getAllByText(/Remove/)[2]);

    expect(onRemoveItem).toHaveBeenCalledWith(data[2], 2);
  });
});