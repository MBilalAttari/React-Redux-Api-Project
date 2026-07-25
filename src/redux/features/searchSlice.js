import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "dog",
    activeTabs: "photos",
    page: 1,
    results: [],
    loading: false,
    hasMore: true,
    error: null,
  },
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
    setHasMore(state) {
      state.hasMore = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearResults(state) {
      state.results = [];
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
} = searchSlice.actions;

export default searchSlice.reducer;
