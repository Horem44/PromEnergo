import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import paginatorSlice from "./paginator-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    paginator: paginatorSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export default store;