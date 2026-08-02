import React from "react";
import { FiSearch } from "react-icons/fi";
import { SUGGESTED_SEARCHES } from "../utils/constants";

const EmptyState = ({ query, onSuggestionClick, title, description }) => {
  return (
    <div className="animate-fade-in mx-auto flex max-w-md flex-col items-center gap-4 py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-surface-2 text-ink-muted">
        <FiSearch size={26} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-ink">
          {title || (query ? `No results for "${query}"` : "Nothing here yet")}
        </h3>
        <p className="mt-1 text-sm text-ink-muted">
          {description || "Try a different search term, or explore one of these:"}
        </p>
      </div>
      {onSuggestionClick && (
        <div className="flex flex-wrap justify-center gap-2">
          {SUGGESTED_SEARCHES.map((term) => (
            <button
              key={term}
              onClick={() => onSuggestionClick(term)}
              className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-ink-muted transition-colors hover:border-photos hover:text-photos cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
