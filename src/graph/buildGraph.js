import {
  profile,
  projects,
  tech,
  experience,
  achievements,
  exploreEntries,
  topics,
} from "../data/portfolioData";
import { positions } from "./layout";

// Node footprints (px, at zoom 1). The wrapper is the hit area; visuals are drawn inside it.
const SIZE = {
  me: 132,
  project: 80,
  featuredProject: 106,
  hub: 60,
  tech: 38,
  journey: 42,
  journeyIcon: 50,
  featuredAchievement: 60,
  explore: 46,
};

const hubDefs = [
  { id: "hub-ai", label: topics.ai.label, accent: "ai", group: "skills" },
  { id: "hub-interface", label: topics.interface.label, accent: "interface", group: "skills" },
  { id: "hub-foundation", label: topics.foundation.label, accent: "foundation", group: "skills" },
  { id: "hub-journey", label: "My journey", accent: "journey", group: "experience" },
  { id: "hub-hackathons", label: "Hackathons", accent: "journey", group: "achievements" },
  { id: "hub-explore", label: "Explore", accent: "neutral", group: "about" },
];

// entities: id -> everything the UI needs to render a node or its card
export const entities = {};
const nodeOrder = [];

function add(entity) {
  entities[entity.id] = entity;
  nodeOrder.push(entity.id);
}

add({
  id: "me",
  kind: "me",
  group: "about",
  accent: "neutral",
  label: profile.name,
  sublabel: profile.role,
  image: profile.photo,
  size: SIZE.me,
});

projects.forEach((p) =>
  add({
    id: p.id,
    kind: "project",
    group: "projects",
    accent: "neutral",
    label: p.title,
    sublabel: p.featured ? "Featured project" : undefined,
    featured: !!p.featured,
    image: p.thumb,
    size: p.featured ? SIZE.featuredProject : SIZE.project,
    ref: p,
  }),
);

tech.forEach((t) =>
  add({
    id: t.id,
    kind: "tech",
    group: "skills",
    accent: t.topic,
    label: t.label,
    size: SIZE.tech,
    ref: t,
  }),
);

experience.forEach((e) =>
  add({
    id: e.id,
    kind: "experience",
    group: "experience",
    accent: "journey",
    label: e.short,
    sublabel: e.date,
    icon: e.icon,
    size: e.icon ? SIZE.journeyIcon : SIZE.journey,
    ref: e,
  }),
);

achievements.forEach((a) =>
  add({
    id: a.id,
    kind: "achievement",
    group: "achievements",
    accent: "journey",
    label: a.short,
    sublabel: a.badges ? a.badges.join(" · ") : a.badge,
    featured: !!a.featured,
    size: a.featured ? SIZE.featuredAchievement : SIZE.journey,
    ref: a,
  }),
);

exploreEntries.forEach((x) =>
  add({
    id: x.id,
    kind: "explore",
    group: "about",
    accent: "neutral",
    label: x.title,
    size: SIZE.explore,
    ref: x,
  }),
);

hubDefs.forEach((h) => add({ ...h, kind: "hub", size: SIZE.hub }));

// ---- edges -------------------------------------------------------------------------------
const edgeList = [];
const seen = new Set();
function link(source, target, kind) {
  const key = `${source}→${target}`;
  if (seen.has(key) || !entities[source] || !entities[target]) return;
  seen.add(key);
  edgeList.push({ id: key, source, target, kind });
}

// structure: faint spokes that give the constellation its shape
projects.forEach((p) => link("me", p.id, "structure"));
["hub-ai", "hub-interface", "hub-foundation", "hub-journey", "hub-explore"].forEach((h) =>
  link("me", h, "structure"),
);
tech.forEach((t) => link(`hub-${t.topic}`, t.id, "structure"));
experience.forEach((e) => link("hub-journey", e.id, "structure"));
link("hub-journey", "hub-hackathons", "structure");
achievements.forEach((a) => link("hub-hackathons", a.id, "structure"));
exploreEntries.forEach((x) => link("hub-explore", x.id, "structure"));

// relations: what was actually built with what, and where it was recognised
projects.forEach((p) => p.techIds.forEach((t) => link(p.id, t, "relation")));
experience.forEach((e) => e.techIds.forEach((t) => link(e.id, t, "relation")));
experience.forEach((e) => (e.projectIds ?? []).forEach((p) => link(e.id, p, "relation")));
achievements.forEach((a) => a.projectIds.forEach((p) => link(p, a.id, "relation")));

// ---- derived lookups ---------------------------------------------------------------------
export const neighbors = {};
Object.keys(entities).forEach((id) => (neighbors[id] = new Set()));
edgeList.forEach(({ source, target }) => {
  neighbors[source].add(target);
  neighbors[target].add(source);
});

export const groups = { projects: new Set(), skills: new Set(), experience: new Set(), achievements: new Set(), about: new Set() };
Object.values(entities).forEach((e) => groups[e.group].add(e.id));

const dist = (id) => Math.hypot(positions[id][0], positions[id][1]);

export const nodes = nodeOrder.map((id, i) => {
  const e = entities[id];
  const [x, y] = positions[id];
  return {
    id,
    type: "graphNode",
    position: { x, y },
    width: e.size,
    height: e.size,
    draggable: false,
    selectable: false,
    connectable: false,
    focusable: false,
    data: {
      kind: e.kind,
      label: e.label,
      sublabel: e.sublabel,
      accent: e.accent,
      image: e.image,
      featured: !!e.featured,
      icon: e.icon,
      size: e.size,
      // deterministic entrance + float timing (no Math.random → stable renders)
      enter: Math.round((dist(id) / 1100) * 900) + (i % 5) * 30,
      floatDur: 7 + ((i * 37) % 50) / 10,
      floatDelay: -(((i * 13) % 70) / 10),
    },
  };
});

export const edges = edgeList.map((e) => ({
  id: e.id,
  source: e.source,
  target: e.target,
  type: "graph",
  data: { kind: e.kind },
  selectable: false,
  focusable: false,
}));

export { positions, SIZE };
