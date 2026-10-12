import { render, screen } from "@testing-library/react";
import EntityDetails from "./EntityDetails";
import * as useLoadingModule from "./hooks/useLoading";

describe("EntityDetails", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("shows Loading while useLoading returns null", () => {
    jest.spyOn(useLoadingModule, "useLoading").mockReturnValue(null);

    render(
      <EntityDetails
        fetchMethod={() => Promise.resolve({})}
        params={1}
        propsToDisplay={{ name: "Name" }}
      />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the entity returned by useLoading", () => {
    const fetchMethod = () => Promise.resolve({ id: 1, name: "From fetch" });
    jest.spyOn(useLoadingModule, "useLoading").mockReturnValue({
      id: 101,
      name: "John",
      email: "john@gmail.com",
    });

    render(
      <EntityDetails
        fetchMethod={fetchMethod}
        params={1}
        propsToDisplay={{ name: "Name" }}
      />
    );

    expect(
      screen.getByRole("heading", { name: "John Details:" })
    ).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.queryByText("From fetch")).not.toBeInTheDocument();
  });

  it("passes fetchMethod and the current params to useLoading", () => {
    const spy = jest.spyOn(useLoadingModule, "useLoading").mockReturnValue(null);
    const fetchMethod = jest.fn(() => new Promise(() => {}));

    const { rerender } = render(
      <EntityDetails
        fetchMethod={fetchMethod}
        params={1}
        propsToDisplay={{ name: "Name" }}
      />
    );

    expect(spy).toHaveBeenCalledWith(fetchMethod, 1);

    rerender(
      <EntityDetails
        fetchMethod={fetchMethod}
        params={2}
        propsToDisplay={{ name: "Name" }}
      />
    );

    expect(spy).toHaveBeenLastCalledWith(fetchMethod, 2);
  });
});
