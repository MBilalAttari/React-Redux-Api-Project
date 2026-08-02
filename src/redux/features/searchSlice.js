import { createSlice } from "@reduxjs/toolkit";
import { loadRecentSearches, persistRecentSearches } from "../../utils/storage";
const query = 'dog'
const recent = loadRecentSearches()
console.log(recent)
const initialState = {
  query: (recent.length > 0) ? recent[0] : query,
  activeTabs: "photos",
  page: 1,
  results: [],
  loading: false,
  hasMore: true,
  error: null,
  recentSearches: loadRecentSearches(),
};
console.log(initialState.query)
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setActiveTabs(state, action) {
      state.activeTabs = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setResults(state, action) {
      state.results = [...state.results, ...action.payload];
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setHasMore(state, action) {
      state.hasMore = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearResults(state) {
      state.results = [];
    },
    addRecentSearch(state, action) {
      const term = action.payload.trim();
      if (!term) return;
      const deduped = [term, ...state.recentSearches.filter((t) => t.toLowerCase() !== term.toLowerCase())];
      state.recentSearches = deduped.slice(0, 8);
      persistRecentSearches(state.recentSearches);
    },
    clearRecentSearches(state) {
      state.recentSearches = [];
      persistRecentSearches([]);
    },
  },
});

export const {
  setQuery,
  setActiveTabs,
  setPage,
  setResults,
  setLoading,
  setHasMore,
  setError,
  clearResults,
  addRecentSearch,
  clearRecentSearches,
} = searchSlice.actions;

export default searchSlice.reducer;
