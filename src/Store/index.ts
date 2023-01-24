import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import paginatorSlice from "./paginator-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    paginator: paginatorSlice.reducer,
    auth: authSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export default store;