import { useEffect } from "react";
import "./index.css";

export default function ScrollToTop() {
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const button = document.querySelector(
        ".scroll-to-top",
      ) as HTMLButtonElement;
      if (scrollY > 150) {
        button.style.display = "block";
      } else {
        button.style.display = "none";
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      style={{ display: "none" }}
      className="scroll-to-top"
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
    >
      Scroll to top
    </button>
  );
}
