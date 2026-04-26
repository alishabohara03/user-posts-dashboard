export default function Loading({ text = "Loading users..." }: { text?: string }) {
  return (
    <div className="state-container">
      <div className="spinner" />
      <p className="state-text">{text}</p>
    </div>
  );
}
