import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "@app/data/constants";

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsAdmin(state, action) {
      state.isAdmin = action.payload;
    },
  },
});

export const { setIsAdmin } = uiSlice.actions;
export default uiSlice.reducer;
