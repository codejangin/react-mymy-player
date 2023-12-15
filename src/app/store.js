import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = configureStore({
  reducer: {},
  devTools: composeWithDevTools(),
});
