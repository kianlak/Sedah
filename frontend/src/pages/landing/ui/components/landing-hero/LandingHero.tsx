import { useEffect, useState, type ReactElement } from "react";
import {
  LANDING_HERO_CONTENT_BY_MODE,
  LANDING_HERO_FADE_DURATION_MS
} from "../../../constants/landingHero";
import type { LandingEntryMode } from "../../../interfaces/landing";
import "../../../css/hero.css";
import type { LandingHeroProps } from "./interfaces/landingHeroProps";

export function LandingHero({ activeMode }: LandingHeroProps): ReactElement {
  const [displayMode, setDisplayMode] = useState<LandingEntryMode>(activeMode);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (activeMode === displayMode) {
      setIsVisible(true);
      return;
    }

    setIsVisible(false);

    const timeoutHandle = window.setTimeout(() => {
      setDisplayMode(activeMode);
      setIsVisible(true);
    }, LANDING_HERO_FADE_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutHandle);
    };
  }, [activeMode, displayMode]);

  return (
    <div className="landing-page__hero">
      <p className="landing-page__eyebrow">Welcome</p>
      <div
        className="landing-page__hero-copy"
        data-visible={isVisible}
      >
        <h1 className="landing-page__title">{LANDING_HERO_CONTENT_BY_MODE[displayMode].title}</h1>
        <p className="landing-page__summary">{LANDING_HERO_CONTENT_BY_MODE[displayMode].summary}</p>
      </div>
    </div>
  );
}
