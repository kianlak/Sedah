import type { ReactElement } from "react";
import { LandingPage } from "../../pages/landing/ui/LandingPage";
import { useAppSelector } from "../store/hooks";

export function AppRouteRenderer(): ReactElement {
  const currentRoute = useAppSelector((state) => state.navigation.currentRoute);

  switch (currentRoute) {
    case "landing":
      return <LandingPage />;
    default:
      return <LandingPage />;
  }
}
