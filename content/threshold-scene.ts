export type SpritePlaybackSpec = {
  assetIds: readonly string[];
  mode: "approved-still-proxy" | "production-atlas" | "production-sequence";
  approvedFrameCount: number;
  targetFrameCount: { min: number; max: number };
  targetDisplayFps: { min: number; max: number };
  interpolation: "discrete";
  reducedMotionFrame: number;
  backlogRequirement: string;
};

export type ThresholdSceneManifest = {
  schemaVersion: 1;
  guardian: {
    id: "kintaro";
    idle: SpritePlaybackSpec;
    activation: SpritePlaybackSpec;
  };
  axe: {
    assetId: "threshold-desktop";
    idleMotion: "stationary";
    activationMotion: "impact-flash-and-ground-pulse";
  };
  relic: {
    id: "hoju";
    assetId: "threshold-desktop";
    stateReferenceId: "hoju-state-reference";
    dimensionalMode: "layered-illustration-2.5d";
    interactionLabel: string;
    fallback: "locked-responsive-poster";
  };
};

export const thresholdSceneManifest = {
  schemaVersion: 1,
  guardian: {
    id: "kintaro",
    idle: {
      assetIds: ["threshold-desktop", "threshold-mobile"],
      mode: "approved-still-proxy",
      approvedFrameCount: 1,
      targetFrameCount: { min: 6, max: 8 },
      targetDisplayFps: { min: 6, max: 10 },
      interpolation: "discrete",
      reducedMotionFrame: 0,
      backlogRequirement: "Transparent empty-handed three-quarter-back idle frames with exact grid and timing metadata.",
    },
    activation: {
      assetIds: ["kintaro-powerup-desktop"],
      mode: "production-sequence",
      approvedFrameCount: 9,
      targetFrameCount: { min: 8, max: 10 },
      targetDisplayFps: { min: 10, max: 12 },
      interpolation: "discrete",
      reducedMotionFrame: 0,
      backlogRequirement: "Independent owner-approved 9:16 mobile activation frames preserving the upward gaze.",
    },
  },
  axe: {
    assetId: "threshold-desktop",
    idleMotion: "stationary",
    activationMotion: "impact-flash-and-ground-pulse",
  },
  relic: {
    id: "hoju",
    assetId: "threshold-desktop",
    stateReferenceId: "hoju-state-reference",
    dimensionalMode: "layered-illustration-2.5d",
    interactionLabel: "Awaken the Hōju relic",
    fallback: "locked-responsive-poster",
  },
} as const satisfies ThresholdSceneManifest;
