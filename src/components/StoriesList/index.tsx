import Story from "../Story";
import "./index.css";

export default function StoriesList({ itemIds }: { itemIds: number[] }) {
  return (
    <div className="stories-list">
      {itemIds.map((itemId) => (
        <Story key={itemId} itemId={itemId} />
      ))}
    </div>
  );
}
