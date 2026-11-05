// Art-directed, fully deterministic layout. No physics: positions never change between loads.
// World units are CSS pixels at zoom 1. "me" sits at the origin; x grows right, y grows down.
//
//   journey (left)  ←  me + projects (centre)  →  interface / foundation / AI clusters (right)
//   explore sits below the centre; hackathons hang off the journey hub.

const rad = (deg) => (deg * Math.PI) / 180;
const polar = (cx, cy, rx, ry, deg) => [
  Math.round(cx + rx * Math.cos(rad(deg))),
  Math.round(cy + ry * Math.sin(rad(deg))),
];
const around = (hub, r, deg, squash = 0.82) => polar(hub[0], hub[1], r, r * squash, deg);

export const ME = [0, 0];

// Projects: an elliptical ring around "me", ordered so related work sits together.
const projectRing = (deg) => polar(0, 0, 330, 225, deg);

const HUB = {
  "hub-ai": [330, -440],
  "hub-interface": [800, -70],
  "hub-foundation": [560, 360],
  "hub-journey": [-660, -110],
  "hub-explore": [-120, 420],
  "hub-hackathons": [-600, 330],
};

const raw = {
  me: ME,

  // projects
  squawk: projectRing(-108),
  salespilot: projectRing(-72),
  relay: projectRing(-36),
  vintner: projectRing(0),
  scholarly: projectRing(36),
  logbook: projectRing(72),
  pulse: projectRing(108),
  smritisetu: projectRing(150),
  // Underdraw sits high enough above the hackathon node that its card never covers it
  underdraw: projectRing(192),
  fittyfit: projectRing(228),

  // hubs
  ...HUB,

  // AI-powered experiences (orange)
  python: around(HUB["hub-ai"], 200, 200),
  fastapi: around(HUB["hub-ai"], 190, 148),
  aiagents: around(HUB["hub-ai"], 150, 258),
  langgraph: around(HUB["hub-ai"], 185, 302),
  voiceai: around(HUB["hub-ai"], 200, 345),
  aiint: around(HUB["hub-ai"], 175, 20),
  computervision: around(HUB["hub-ai"], 240, 176),
  aiml: around(HUB["hub-ai"], 225, 232),
  vtracer: around(HUB["hub-ai"], 240, 122),

  // Crafting digital interfaces (blue)
  react: around(HUB["hub-interface"], 225, 215),
  nextjs: around(HUB["hub-interface"], 225, 168),
  tailwind: around(HUB["hub-interface"], 185, 252),
  typescript: around(HUB["hub-interface"], 180, 292),
  javascript: around(HUB["hub-interface"], 205, 340),
  vite: around(HUB["hub-interface"], 205, 20),
  bootstrap: around(HUB["hub-interface"], 185, 78),
  threejs: around(HUB["hub-interface"], 225, 124),

  // Building foundations (green)
  postgres: around(HUB["hub-foundation"], 150, 212),
  prisma: around(HUB["hub-foundation"], 150, 262),
  nextauth: around(HUB["hub-foundation"], 150, 318),
  nodejs: around(HUB["hub-foundation"], 150, 8),
  express: around(HUB["hub-foundation"], 150, 68),
  restapi: around(HUB["hub-foundation"], 150, 130),
  vercel: around(HUB["hub-foundation"], 275, 190),
  render: around(HUB["hub-foundation"], 280, 240),
  railway: around(HUB["hub-foundation"], 280, 292),
  mysql: around(HUB["hub-foundation"], 280, 345),
  flask: around(HUB["hub-foundation"], 280, 30),

  // My journey (violet)
  apyx: around(HUB["hub-journey"], 215, 282, 0.9),
  "srdt-2026": around(HUB["hub-journey"], 230, 235, 0.9),
  outskill: around(HUB["hub-journey"], 235, 190, 0.9),
  ibm: around(HUB["hub-journey"], 225, 150, 0.9),
  "srdt-2025": around(HUB["hub-journey"], 200, 112, 0.9),
  btech: around(HUB["hub-journey"], 205, 22, 0.9),
  "murf-voice-agents": around(HUB["hub-journey"], 225, 330, 0.9),

  // Hackathons (violet)
  "bit-n-build": around(HUB["hub-hackathons"], 195, 338),
  "inter-college": around(HUB["hub-hackathons"], 175, 42),
  hackwithup: around(HUB["hub-hackathons"], 170, 108),
  tnx: around(HUB["hub-hackathons"], 165, 168),
  "nerds-room": around(HUB["hub-hackathons"], 175, 228),

  // Explore
  resume: around(HUB["hub-explore"], 150, 158),
  github: around(HUB["hub-explore"], 150, 100),
  linkedin: around(HUB["hub-explore"], 160, 38),
  contact: around(HUB["hub-explore"], 140, 232),
};

// The authored layout is generous; this squeezes it so the whole universe fits a laptop
// viewport at a zoom where labels are still readable.
const SX = 0.88;
const SY = 0.8;
export const positions = Object.fromEntries(
  Object.entries(raw).map(([id, [x, y]]) => [id, [Math.round(x * SX), Math.round(y * SY)]]),
);
