import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { AppProviders } from "./providers/AppProviders";
import { createAppStore } from "./store/store";

export function bootstrapApplication(): void {
  const host = document.querySelector<HTMLDivElement>("#app");

  if (!host) {
    throw new Error("Expected #app root element to exist");
  }

  const root = createRoot(host);
  const store = createAppStore();

  root.render(
    <StrictMode>
      <AppProviders store={store}>
        <App />
      </AppProviders>
    </StrictMode>
  );
}
