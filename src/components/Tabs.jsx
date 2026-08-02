import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTabs, clearResults, setPage, setHasMore } from "../redux/features/searchSlice";
import { TABS } from "../utils/constants";

const Tabs = () => {
  const dispatch = useDispatch();
  const activeTabs = useSelector((state) => state.search.activeTabs); 
  const savedCount = useSelector((state) => state.collection.items.length);

  const handleClick = (tabId) => {
    if (tabId === activeTabs) return;
    dispatch(setActiveTabs(tabId));
    dispatch(clearResults());
    dispatch(setPage(1));
    dispatch(setHasMore(true));
  };

  return (
    <nav
      aria-label="Media type"
      className=" flex max-w-6xl gap-1 mb-4 overflow-x-auto px-4 pb-1 pt-4 sm:gap-2 sm:px-6"
    >
      {TABS.map((tab) => {
        const isActive = activeTabs === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.id)}
            aria-current={isActive ? "true" : undefined}
            style={{ "--accent": tab.color }}
            className={`group relative flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
              isActive ? "text-(--accent)" : "text-ink-muted hover:text-ink"
            }`}
          >
            <Icon size={15} />
            {tab.label}
            {tab.id === "saved" && savedCount > 0 && (
              <span
                className={`ml-0.5 rounded-full px-1.5 py-0.5 font-mono text-[10px] leading-none ${
                  isActive ? "bg-(--accent) text-black" : "bg-surface-2 text-ink-muted"
                }`}
              >
                {savedCount}
              </span>
            )}
            <span
              className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-(--accent) transition-opacity ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
};

export default Tabs;
