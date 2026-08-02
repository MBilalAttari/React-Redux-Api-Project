import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/searchSlice";
import collectionReducer from "./features/collectionSlice";
import { persistSavedItems } from "../utils/storage";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    collection: collectionReducer,
  },
});

// Persist the saved/bookmarked items collection to localStorage whenever it changes.
let previousItems = store.getState().collection.items;
store.subscribe(() => {
  const currentItems = store.getState().collection.items;
  if (currentItems !== previousItems) {
    previousItems = currentItems;
    persistSavedItems(currentItems);
  }
});
