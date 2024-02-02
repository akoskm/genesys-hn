import React from "react";
import App from "./App";

const mockRender = jest.fn();
jest.mock("react-dom/client", () => ({
  createRoot: () => ({ render: mockRender }),
}));
describe("index", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    div.id = "root";

    require("./index");

    expect(mockRender).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  });
});
