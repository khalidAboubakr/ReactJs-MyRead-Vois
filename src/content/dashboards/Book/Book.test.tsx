
import { renderHook } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";

import { Book } from "./Book";

const makeSut = () => {
  return renderHook(() => Book());
};

describe("Book()", () => {
  test("Should return 0 on initial state", () => {
    const { result } = makeSut();

    expect(result.current.state).toBe(0);
  });

  test("Should has more than one book", () => {
    const { result } = makeSut();

    act( () => {
      result.current.increment();
    });

    expect(result.current.state).toBe(!==0);
  });

})