import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch, FiX, FiClock } from "react-icons/fi";
import {
  setQuery,
  clearResults,
  setPage,
  setHasMore,
  addRecentSearch,
  clearRecentSearches,
} from "../redux/features/searchSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { query, recentSearches, activeTabs } = useSelector((state) => state.search);
  const [text, setText] = useState(query);
  const [showRecent, setShowRecent] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setText(query);
  }, [query]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowRecent(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const runSearch = (term) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setText(trimmed);
    dispatch(setQuery(trimmed));
    dispatch(clearResults());
    dispatch(setPage(1));
    dispatch(setHasMore(true));
    dispatch(addRecentSearch(trimmed));
    setShowRecent(false);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    runSearch(text);
  };

  const isSavedTab = activeTabs === "saved";

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={formSubmit} className="flex items-center gap-2">
        <div
          className={`flex flex-1 items-center gap-2 rounded-full border bg-surface px-4 py-2.5 transition-colors ${
            showRecent ? "border-photos" : "border-line"
          } ${isSavedTab ? "opacity-60" : ""}`}
        >
          <FiSearch className="shrink-0 text-ink-muted" size={17} />
          <input
            type="text"
            value={text}
            disabled={isSavedTab}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setShowRecent(true)}
            placeholder={isSavedTab ? "Browsing your saved items" : "Search photos, videos, GIFs..."}
            aria-label="Search"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted disabled:cursor-not-allowed"
          />
          {text && !isSavedTab && (
            <button
              type="button"
              onClick={() => setText("")}
              aria-label="Clear search"
              className="shrink-0 text-ink-muted transition-colors hover:text-videos cursor-pointer"
            >
              <FiX size={16} />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={isSavedTab}
          className="shrink-0 rounded-full bg-photos px-5 py-2.5 text-sm font-medium text-white transition-transform active:scale-95 disabled:opacity-50 cursor-pointer hover:brightness-110"
        >
          Search
        </button>
      </form>

      {showRecent && !isSavedTab && recentSearches.length > 0 && (
        <div className="animate-scale-in absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-line bg-surface shadow-xl">
          <div className="flex items-center justify-between px-4 pt-3 text-xs font-mono uppercase tracking-wide text-ink-muted">
            <span>Recent searches</span>
            <button
              type="button"
              onClick={() => dispatch(clearRecentSearches())}
              className="hover:text-videos cursor-pointer"
            >
              Clear
            </button>
          </div>
          <ul className="p-2">
            {recentSearches.map((term) => (
              <li key={term}>
                <button
                  type="button"
                  onClick={() => runSearch(term)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-surface-2 cursor-pointer"
                >
                  <FiClock size={14} className="text-ink-muted" />
                  {term}
                  
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
