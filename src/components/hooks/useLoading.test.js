import { act, renderHook } from "@testing-library/react";
import { useLoading } from "./useLoading";

function deferred() {
  let resolve;
  const promise = new Promise((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

describe("useLoading", () => {
  it("returns null before the request resolves", () => {
    const { result } = renderHook(() => useLoading(() => new Promise(() => {})));

    expect(result.current).toBeNull();
  });

  it("returns the resolved value", async () => {
    function fetchMethod() {
      return Promise.resolve(1);
    }

    const { result } = renderHook(() => useLoading(fetchMethod));

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current).toBe(1);
  });

  it("calls fetchMethod with params", async () => {
    const fetchMethod = jest.fn(() => Promise.resolve("ok"));
    const { result } = renderHook(() => useLoading(fetchMethod, 4));

    await act(async () => {
      await Promise.resolve();
    });

    expect(fetchMethod).toHaveBeenCalledWith(4);
    expect(result.current).toBe("ok");
  });

  it("returns null and loads new data when params change", async () => {
    const first = deferred();
    const second = deferred();
    const fetchMethod = jest
      .fn()
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(second.promise);

    const { result, rerender } = renderHook(
      ({ id }) => useLoading(fetchMethod, id),
      { initialProps: { id: 1 } }
    );

    await act(async () => {
      first.resolve("first");
    });
    expect(result.current).toBe("first");

    rerender({ id: 2 });
    expect(result.current).toBeNull();
    expect(fetchMethod).toHaveBeenLastCalledWith(2);

    await act(async () => {
      second.resolve("second");
    });
    expect(result.current).toBe("second");
  });

  it("returns null and loads new data when fetchMethod changes", async () => {
    const first = deferred();
    const second = deferred();
    const firstMethod = jest.fn(() => first.promise);
    const secondMethod = jest.fn(() => second.promise);

    const { result, rerender } = renderHook(
      ({ fetchMethod }) => useLoading(fetchMethod),
      { initialProps: { fetchMethod: firstMethod } }
    );

    await act(async () => {
      first.resolve("first");
    });
    expect(result.current).toBe("first");

    rerender({ fetchMethod: secondMethod });
    expect(result.current).toBeNull();
    expect(secondMethod).toHaveBeenCalledTimes(1);

    await act(async () => {
      second.resolve("second");
    });
    expect(result.current).toBe("second");
  });
});
