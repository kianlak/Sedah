import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppRoute } from "../../../navigation/interfaces/appRoute";
import type { NavigationState } from "./interfaces/navigationState";

const initialState: NavigationState = {
  currentRoute: "landing"
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    navigateTo(state, action: PayloadAction<AppRoute>) {
      state.currentRoute = action.payload;
    }
  }
});

export const { navigateTo } = navigationSlice.actions;
export const navigationReducer = navigationSlice.reducer;
