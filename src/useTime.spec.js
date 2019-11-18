import { renderHook, act } from "@testing-library/react-hooks";
import useTime from "./useTime";
import MockDate from "mockdate";

describe("Tests for useTime", () => {
  const testDate = 1572474034742;
  beforeAll(() => MockDate.set(testDate));
  afterAll(() => MockDate.reset());

  test("should verify the useTime hook returns an object with props defaulting to 24 hour time", () => {
    // Arrange/Act
    const expectedDate = new Date(testDate);
    const expectedHours = expectedDate.getHours();
    const expectedMinutes = expectedDate.getMinutes();
    const expectedSeconds = expectedDate.getSeconds();

    const {
      result: {
        current: { seconds, minutes, hours, ampm }
      }
    } = renderHook(() => useTime());

    expect(ampm).toBe("");
    expect(hours).toBe(expectedHours);
    expect(minutes).toBe(expectedMinutes);
    expect(seconds).toBe(expectedSeconds);
  });

  test("should verify the useTime hook returns an object with properties and format set to 12-hour", () => {
    // Arrange/Act
    const expectedDate = new Date(testDate);
    const expectedHours = ((expectedDate.getHours() + 11) % 12) + 1;
    const expectedMinutes = expectedDate.getMinutes();
    const expectedSeconds = expectedDate.getSeconds();

    const {
      result: {
        current: { seconds, minutes, hours, ampm }
      }
    } = renderHook(() => useTime({ format: "12-hour" }));

    expect(ampm).toBe("pm");
    expect(hours).toBe(expectedHours);
    expect(minutes).toBe(expectedMinutes);
    expect(seconds).toBe(expectedSeconds);
  });

  test("should verify the useTime hook returns 12:00 with properties and format set to 12-hour and date time of noon", () => {
    // Arrange/Act
    const testDateNoon = new Date("October 30, 2019 12:00:00");
    MockDate.set(testDateNoon);
    const expectedDate = new Date(testDateNoon);
    const expectedHours = ((expectedDate.getHours() + 11) % 12) + 1;
    const expectedMinutes = expectedDate.getMinutes();
    const expectedSeconds = expectedDate.getSeconds();

    const {
      result: {
        current: { seconds, minutes, hours, ampm }
      }
    } = renderHook(() => useTime({ format: "12-hour" }));

    expect(ampm).toBe("pm");
    expect(hours).toBe(expectedHours);
    expect(minutes).toBe(expectedMinutes);
    expect(seconds).toBe(expectedSeconds);
  });

  test("should verify the useTime hook returns 8:00 am with properties and format set to 12-hour and date time of 8am", () => {
    // Arrange/Act
    const testDate8am = new Date("October 30, 2019 08:00:00");
    MockDate.set(testDate8am);
    const expectedDate = new Date(testDate8am);
    const expectedHours = ((expectedDate.getHours() + 11) % 12) + 1;
    const expectedMinutes = expectedDate.getMinutes();
    const expectedSeconds = expectedDate.getSeconds();

    const {
      result: {
        current: { seconds, minutes, hours, ampm }
      }
    } = renderHook(() => useTime({ format: "12-hour" }));

    expect(ampm).toBe("am");
    expect(hours).toBe(expectedHours);
    expect(minutes).toBe(expectedMinutes);
    expect(seconds).toBe(expectedSeconds);
  });

  test("should reset the timer reset is invoked", () => {
    // Arrange/Act
    const testDate8am = new Date("November 30, 2019 08:00:00");
    MockDate.set(testDate8am);
    const expectedDate = new Date(testDate8am);
    const expectedHours = ((expectedDate.getHours() + 11) % 12) + 1;
    const expectedMinutes = expectedDate.getMinutes();
    const expectedSeconds = expectedDate.getSeconds();

    const {
      rerender,
      result: {
        current: { seconds, minutes, hours, ampm, start, reset }
      }
    } = renderHook(() => useTime());

    act(() => {
      reset();
      reset();
      start();
      start();
      rerender({ format: "12-hour" });
    });

    expect(ampm).toBe("");
    expect(hours).toBe(expectedHours);
    expect(minutes).toBe(expectedMinutes);
    expect(seconds).toBe(expectedSeconds);
  });
});
