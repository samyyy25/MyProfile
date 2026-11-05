import { entities, groups, neighbors } from "./buildGraph";

// Kinds whose selection replaces the node with a floating card.
export const CARD_KINDS = new Set(["me", "project", "experience", "achievement", "explore"]);
// Kinds that can open the full detail overlay.
export const DETAIL_KINDS = new Set(["project", "experience", "achievement", "me"]);

export function hasDetail(id) {
  const e = entities[id];
  return !!e && (DETAIL_KINDS.has(e.kind) || id === "contact");
}

/** Achievements that a project was built for (e.g. a hackathon placement). */
export function achievementsFor(projectId) {
  return Object.values(entities).filter(
    (e) => e.kind === "achievement" && e.ref.projectIds.includes(projectId),
  );
}

/** Badge labels for an achievement: the featured ones list several, the others a single placing. */
export function badgesOf(achievement) {
  const { badges, badge } = achievement.ref;
  return badges ?? (badge ? [badge] : []);
}

/** "Event title", plus the team when the entry names one. */
export function awardTitle(achievement) {
  const { title, team } = achievement.ref;
  return team ? `${title} · ${team}` : title;
}

/** Emphasis state for one node, derived from selection / hover / focus mode. */
export function getNodeState(id, { selectedId, hoverId, focusGroup }) {
  const selected = id === selectedId;
  const related = !!selectedId && !selected && neighbors[selectedId].has(id);
  const hovered = id === hoverId;
  const hint = !!hoverId && !hovered && neighbors[hoverId].has(id);

  let dimmed = false;
  if (selectedId) dimmed = !selected && !related;
  else if (focusGroup) dimmed = !groups[focusGroup].has(id);

  return { selected, related, hovered, hint, dimmed };
}

/** Visual state for one edge: strong when it touches the selection, medium on hover. */
export function getEdgeState(source, target, { selectedId, hoverId, focusGroup }) {
  const touches = (id) => id && (source === id || target === id);
  if (touches(selectedId)) return "active";
  if (touches(hoverId)) return "hover";
  if (selectedId) return "dim";
  if (focusGroup) {
    const g = groups[focusGroup];
    return g.has(source) && g.has(target) ? "focus" : "dim";
  }
  return "rest";
}

const ARROWS = {
  ArrowRight: [1, 0],
  ArrowLeft: [-1, 0],
  ArrowDown: [0, 1],
  ArrowUp: [0, -1],
};

export const isArrowKey = (key) => key in ARROWS;

/** Nearest node within ±60° of the arrow direction (spatial keyboard navigation). */
export function nextInDirection(fromId, key, positions) {
  const [dx, dy] = ARROWS[key];
  const [fx, fy] = positions[fromId];
  let best = null;
  let bestScore = Infinity;
  for (const id of Object.keys(positions)) {
    if (id === fromId) continue;
    const vx = positions[id][0] - fx;
    const vy = positions[id][1] - fy;
    const d = Math.hypot(vx, vy);
    if (!d) continue;
    const cos = (vx * dx + vy * dy) / d;
    if (cos < 0.5) continue;
    const score = d / cos;
    if (score < bestScore) {
      bestScore = score;
      best = id;
    }
  }
  return best;
}
