import { render, screen } from "@testing-library/react";
import App from "./App";
import fetchMock from "fetch-mock-jest";

describe("App", () => {
  it("renders learn react link", async () => {
    const response = [1, 2];
    fetchMock.get(
      "https://hacker-news.firebaseio.com/v0/newstories.json",
      response,
    );
    const title1 = "Building a Hacker News UI with React";
    const url1 = "https://www.example.com/hacker-news-ui-with-react";
    const title2 = "Writing tests for React components using Jest and Enzyme";
    const url2 = "https://www.example.com/writing-tests-for-react-components";

    fetchMock.get("https://hacker-news.firebaseio.com/v0/item/1.json", {
      title: title1,
      by: "foo",
      time: new Date("2021-01-01").getTime() / 1000,
      url: url1,
    });
    fetchMock.get("https://hacker-news.firebaseio.com/v0/item/2.json", {
      title: title2,
      by: "bar",
      time: new Date("2021-01-02").getTime() / 1000,
      url: url2,
    });
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Latest Stories", level: 1 }),
    ).toBeInTheDocument();
    expect(await screen.findByRole("link", { name: title1 })).toHaveAttribute(
      "href",
      url1,
    );
    expect(await screen.findByRole("link", { name: title2 })).toHaveAttribute(
      "href",
      url2,
    );
  });
});
