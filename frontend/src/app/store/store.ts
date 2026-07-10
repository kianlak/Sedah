import { configureStore } from "@reduxjs/toolkit";
import { navigationReducer } from "./slices/navigationSlice";
import { settingsReducer } from "./slices/settingsSlice";
import type { AppSettings } from "../../settings/interfaces/appSettings";
import { persistSettings } from "../../settings/logic/persistSettings";
import { resolveInitialSettings } from "../../settings/logic/resolveInitialSettings";

export function createAppStore() {
  const initialSettings = resolveInitialSettings();

  const store = configureStore({
    reducer: {
      navigation: navigationReducer,
      settings: settingsReducer
    },
    preloadedState: {
      settings: initialSettings
    }
  });
  let lastPersistedSettings: AppSettings = store.getState().settings;

  store.subscribe(() => {
    const currentSettings = store.getState().settings;

    if (areSettingsEqual(lastPersistedSettings, currentSettings)) {
      return;
    }

    persistSettings(currentSettings);
    lastPersistedSettings = currentSettings;
  });

  return store;
}

function areSettingsEqual(left: AppSettings, right: AppSettings): boolean {
  return left.themeId === right.themeId;
}

export type AppStore = ReturnType<typeof createAppStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
