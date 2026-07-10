import { useRef, useState, type ReactElement } from "react";
import type { LandingEntryMode } from "../interfaces/landing";
import "../css/page-shell.css";
import { AmbientWaveView } from "./background/ambient-wave/ui/AmbientWaveView";
import { LandingCard } from "./components/landing-card/LandingCard";
import { LandingHero } from "./components/landing-hero/LandingHero";

export function LandingPage(): ReactElement {
  const pageRef = useRef<HTMLElement | null>(null);
  const [activeMode, setActiveMode] = useState<LandingEntryMode>("login");

  return (
    <section
      ref={pageRef}
      aria-label="Landing"
      className="landing-page-shell"
    >
      <AmbientWaveView hostRef={pageRef} />

      <section
        aria-label="Landing"
        className="landing-page"
      >
        <div className="landing-page__layout">
          <LandingHero activeMode={activeMode} />
          <LandingCard
            activeMode={activeMode}
            onModeChange={setActiveMode}
          />
        </div>
      </section>
    </section>
  );
}
