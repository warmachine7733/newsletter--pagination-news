import { configureStore, combineReducers } from "@reduxjs/toolkit";

import search from "./reducers";

export const store = configureStore({
  reducer: combineReducers({
    search,
  }),
});
