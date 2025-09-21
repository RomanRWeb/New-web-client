import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "@app/data/constants";

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setCurrentClient(state, action) {
      state.currentClient = action.payload;
    },
    setCurrentManager(state, action) {
      state.currentManager = action.payload;
    },
    setIsAdmin(state, action) {
      state.isAdmin = action.payload;
    },
  },
});

export const { setCurrentClient, setCurrentManager, setIsAdmin } =
  uiSlice.actions;
export default uiSlice.reducer;
