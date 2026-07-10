import type { PropsWithChildren } from "react";
import type { AppStore } from "../../store/store";

export interface AppProvidersProps extends PropsWithChildren {
  store: AppStore;
}
