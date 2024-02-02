import { useEffect, useState } from "react";
import ScrollToTop from "./components/ScrollToTop";
import StoriesList from "./components/StoriesList";

function App() {
  const [itemIds, setItemIds] = useState<number[]>([]);
  useEffect(() => {
    // TODO replace showstories with newstories
    fetch("https://hacker-news.firebaseio.com/v0/showstories.json")
      .then((res) => res.json())
      .then((data) => {
        setItemIds(data);
      });
  }, []);

  return (
    <div>
      <h1>Latest Stories</h1>
      <StoriesList itemIds={itemIds} />
      <ScrollToTop />
    </div>
  );
}

export default App;
