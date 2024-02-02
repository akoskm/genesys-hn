import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { StoryType } from "../../types";
import "./index.css";

export default function Story({ itemId }: { itemId: number }) {
  const [story, setStory] = useState<StoryType | null>(null);
  useEffect(() => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)
      .then((res) => res.json())
      .then((data) => {
        setStory(data);
      });
  }, [itemId]);
  if (!story) {
    return <div>Loading...</div>;
  }
  return (
    <div className="story-card">
      <a className="title" href={story.url}>
        {story.title}
      </a>
      <div className="details">
        <div className="score">{story.score} points</div>
        by <div className="author">{story.by}</div>
        <div className="time">{dayjs(story.time * 1000).fromNow()}</div>
      </div>
    </div>
  );
}
