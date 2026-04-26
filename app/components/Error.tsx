
interface ErrorProps {
  message?: string;
  onRetry?: () => void;
}

export default function Error({
  message = "Something went wrong",
  onRetry,
}: ErrorProps) {
  return (
    <div className="state-container error">
      <span className="error-icon">⚠</span>
      <p className="state-text">{message}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
