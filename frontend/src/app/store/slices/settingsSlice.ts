import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppSettings } from "../../../settings/interfaces/appSettings";

const initialState: AppSettings = {
  themeId: "midnight"
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setThemePreference(state, action: PayloadAction<string>) {
      state.themeId = action.payload;
    }
  }
});

export const { setThemePreference } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
