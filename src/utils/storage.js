const COLLECTION_KEY = "lumo-saved-items";
const RECENT_KEY = "lumo-recent-searches";

export const loadSavedItems = () => {
  try {
    const raw = window.localStorage.getItem(COLLECTION_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const persistSavedItems = (items) => {
  try {
    window.localStorage.setItem(COLLECTION_KEY, JSON.stringify(items));
  } catch {
    // localStorage may be unavailable (private mode, quota exceeded) — fail silently
  }
};

export const loadRecentSearches = () => {
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const persistRecentSearches = (items) => {
  try {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
};
