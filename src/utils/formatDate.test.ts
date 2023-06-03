import { formatDate } from "./formatDate.ts";

describe("formateDate", () => {
  it("should return the same date when iso string input", () => {
    expect(formatDate("2020-01-01T00:00:00Z")).toEqual(
      "2020-01-01T00:00:00.000Z"
    );
  });

  it("should return iso string when valid date/time input", () => {
    expect(formatDate("01/01/2020 00:00")).toEqual("2020-01-01T00:00:00.000Z");
  });

  it("should throw an error when invalid date/time input", () => {
    expect(() => formatDate("this is not a date time value")).toThrow();
  });

  it("should throw an error when empty date/time input", () => {
    expect(() => formatDate("")).toThrow();
  });

  it("should throw an error when undefined date/time input", () => {
    // @ts-ignore
    expect(() => formatDate(undefined)).toThrow();
  });
});
