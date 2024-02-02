import { render, screen } from "@testing-library/react";
import ScrollToTop from "./index";
import userEvent from "@testing-library/user-event";

describe("ScrollToTop", () => {
  it("hides the button util the user scrolls down", () => {
    render(<ScrollToTop />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    window.scrollY = 200;
    window.dispatchEvent(new Event("scroll"));
    expect(screen.getByRole("button")).toHaveStyle("display: block");
  });

  it("scrolls to top when button is clicked", async () => {
    jest.spyOn(window, "scrollTo").mockImplementation();
    render(<ScrollToTop />);
    window.scrollY = 200;
    window.dispatchEvent(new Event("scroll"));
    await userEvent.click(screen.getByRole("button"));
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    window.scrollY = 0;
    window.dispatchEvent(new Event("scroll"));
  });
});
