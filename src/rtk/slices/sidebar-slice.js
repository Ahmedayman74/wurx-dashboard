import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false, // Initial state of the sidebar (closed)
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen; // Toggle the sidebar state
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
