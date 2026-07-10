import type { LandingEntryMode } from "../../../../interfaces/landing";
import type { LandingHeroContent } from "../interfaces/landingHeroContent";

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
