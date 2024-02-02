import { test, expect } from "@playwright/test";
import { Page } from "playwright";

test("has title", async ({ page }: { page: Page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Hacker News UI/);
});

test("get started link", async ({ page: screen }: { page: Page }) => {
  // response to https://hacker-news.firebaseio.com/v0/showstories.json with [1, 2, 3]
  await screen.route("**/showstories.json", (route) => {
    route.fulfill({ status: 200, body: "[1, 2, 3]" });
  });

  await screen.goto("/");

  // response to https://hacker-news.firebaseio.com/v0/item/1.json with { "id": 1, "title": "Test" }
  await screen.route("**/item/1.json", (route) => {
    route.fulfill({
      status: 200,
      body: '{ "id": 1, "title": "Test", "url": "example.com" }',
    });
  });

  await expect(screen.getByRole("link", { name: "Test" })).toHaveAttribute(
    "href",
    "example.com",
  );
});
