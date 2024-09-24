import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";
import sidebarSlice from "./slices/sidebar-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    sidebar: sidebarSlice,
  },
});

export default store;
