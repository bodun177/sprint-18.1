import { fireEvent, render, screen } from "@testing-library/react";
import EntitiesList from "./EntitiesList";
import * as useLoadingModule from "./hooks/useLoading";

describe("EntitiesList", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("shows Loading while useLoading returns null", () => {
    jest.spyOn(useLoadingModule, "useLoading").mockReturnValue(null);

    render(
      <EntitiesList
        fetchMethod={() => Promise.resolve([])}
        propsToDisplay={{ name: "Name" }}
        onEntityDetailsClick={() => {}}
      />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the list returned by useLoading", () => {
    const fetchMethod = () =>
      Promise.resolve([{ id: 1, name: "From fetch" }]);
    jest.spyOn(useLoadingModule, "useLoading").mockReturnValue([
      { id: 101, name: "John" },
    ]);

    render(
      <EntitiesList
        fetchMethod={fetchMethod}
        propsToDisplay={{ name: "Name" }}
        onEntityDetailsClick={() => {}}
      />
    );

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.queryByText("From fetch")).not.toBeInTheDocument();
    expect(useLoadingModule.useLoading).toHaveBeenCalledTimes(1);
    expect(useLoadingModule.useLoading).toHaveBeenCalledWith(fetchMethod);
  });

  it("reports the clicked entity id", () => {
    jest.spyOn(useLoadingModule, "useLoading").mockReturnValue([
      { id: 101, name: "John" },
    ]);
    const onEntityDetailsClick = jest.fn();

    render(
      <EntitiesList
        fetchMethod={() => Promise.resolve([])}
        propsToDisplay={{ name: "Name" }}
        onEntityDetailsClick={onEntityDetailsClick}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "👀" }));

    expect(onEntityDetailsClick).toHaveBeenCalledWith(101);
  });
});
