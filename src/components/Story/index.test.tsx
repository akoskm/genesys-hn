import { render, screen } from "@testing-library/react";
import fetchMock from "fetch-mock";
import Story from "./index";

describe("Story", () => {
  it("show loading", () => {
    render(<Story itemId={31} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  describe("when data is loaded", () => {
    it("show story title", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2021-01-03"));
      const title1 = "Building a Hacker News UI with React";
      const url1 = "https://www.example.com/hacker-news-ui-with-react";
      fetchMock.get("https://hacker-news.firebaseio.com/v0/item/31.json", {
        title: title1,
        by: "bar",
        time: new Date("2021-01-02").getTime() / 1000,
        url: url1,
        score: 10,
      });

      render(<Story itemId={31} />);

      expect(
        await screen.findByRole("link", { name: title1 }),
      ).toBeInTheDocument();
      expect(screen.getByText("10 points")).toBeInTheDocument();
      expect(screen.getByText("bar")).toBeInTheDocument();
      expect(screen.getByText("a day ago")).toBeInTheDocument();

      jest.useRealTimers();
    });
  });
});
