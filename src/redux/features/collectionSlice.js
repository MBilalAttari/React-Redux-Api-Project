import { createSlice } from "@reduxjs/toolkit";
import { loadSavedItems } from "../../utils/storage";

const initialState = {
  items: loadSavedItems(),
};

const keyOf = (item) => `${item.type}-${item.id}`;

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    toggleSaved(state, action) {
      const item = action.payload;
      const key = keyOf(item);
      const existingIndex = state.items.findIndex((i) => keyOf(i) === key);
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.unshift({ ...item, savedAt: Date.now() });
      }
    },
    clearSaved(state) {
      state.items = [];
    },
  },
});

export const { toggleSaved, clearSaved } = collectionSlice.actions;
export const selectIsSaved = (item) => (state) =>
  state.collection.items.some((i) => keyOf(i) === keyOf(item));

export default collectionSlice.reducer;
