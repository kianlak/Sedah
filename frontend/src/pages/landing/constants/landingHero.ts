import type { LandingEntryMode } from "../interfaces/landing";
import type { LandingHeroContent } from "../ui/components/landing-hero/interfaces/landingHeroContent";

export const LANDING_HERO_FADE_DURATION_MS = 420;

export const LANDING_HERO_CONTENT_BY_MODE: Record<LandingEntryMode, LandingHeroContent> = {
  login: {
    title: "Pick Up Where You Left Off",
    summary: "Your music is still here, just step back in"
  },
  signup: {
    title: "Create Your Listening Space",
    summary: "A few details and you are on your way"
  }
};
