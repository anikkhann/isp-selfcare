import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/auth/AuthSlice";
import SiteReducer from "./features/site/SiteSlice";

export const store = configureStore({
  reducer: {
    // reference reducers here
    auth: AuthReducer,
    site: SiteReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

// create types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
