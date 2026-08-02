import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="animate-fade-in mx-auto flex max-w-md flex-col items-center gap-4 py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-videos/10 text-videos">
        <FiAlertTriangle size={26} />
      </div>
      <div>
        <h3 className="font-[var(--font-display)] text-lg font-semibold text-ink">Something went wrong</h3>
        <p className="mt-1 text-sm text-ink-muted">{message || "We couldn't load results. Please try again."}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-full bg-photos px-4 py-2 text-sm font-medium text-white transition-transform active:scale-95 cursor-pointer hover:brightness-110"
        >
          <FiRefreshCw size={15} />
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
