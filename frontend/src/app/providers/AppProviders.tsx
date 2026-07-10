import type { ReactElement } from "react";
import { Provider } from "react-redux";
import type { AppProvidersProps } from "./interfaces/appProvidersProps";

export function AppProviders({ children, store }: AppProvidersProps): ReactElement {
  return <Provider store={store}>{children}</Provider>;
}
