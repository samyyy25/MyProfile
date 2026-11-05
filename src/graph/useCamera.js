import { useCallback, useMemo } from "react";
import { getViewportForBounds, useReactFlow, useStoreApi } from "@xyflow/react";
import { entities, groups, neighbors, nodes, positions } from "./buildGraph";
import { CARD_KINDS } from "./graphState";

export const MIN_ZOOM = 0.2;
export const MAX_ZOOM = 2.4;

// Approximate on-screen footprint of a floating card, in world units (zoom 1).
const CARD = { w: 340, h: 300 };

/** Rect (world units) covering a node, its label, and its card when it has one. */
function nodeRect(id, withCard) {
  const [x, y] = positions[id];
  const half = entities[id].size / 2;
  let rect = { l: x - half - 56, r: x + half + 56, t: y - half - 18, b: y + half + 38 };
  if (withCard && CARD_KINDS.has(entities[id].kind)) {
    rect = {
      l: Math.min(rect.l, x - CARD.w / 2),
      r: Math.max(rect.r, x + CARD.w / 2),
      t: Math.min(rect.t, y - CARD.h / 2),
      b: Math.max(rect.b, y + CARD.h / 2),
    };
  }
  return rect;
}

function union(rects) {
  const l = Math.min(...rects.map((r) => r.l));
  const r = Math.max(...rects.map((r) => r.r));
  const t = Math.min(...rects.map((r) => r.t));
  const b = Math.max(...rects.map((r) => r.b));
  return { x: l, y: t, width: r - l, height: b - t };
}

/**
 * Camera moves for the graph. All moves are animated via React Flow's d3-zoom transition and
 * collapse to instant jumps when `reduced` is true (prefers-reduced-motion).
 * `compact` switches to the tighter chrome insets and higher focus zoom used on phones.
 */
export function useCamera({ reduced, compact }) {
  const rf = useReactFlow();
  const store = useStoreApi();

  const padding = useMemo(
    () =>
      compact
        ? { top: "76px", bottom: "92px", left: "12px", right: "12px" }
        : { top: "88px", bottom: "100px", left: "28px", right: "28px" },
    [compact],
  );
  const minFocusZoom = compact ? 0.85 : 0.6;

  const viewportFor = useCallback(
    (rects, minZoom, maxZoom) => {
      const { width, height } = store.getState();
      return getViewportForBounds(union(rects), width, height, minZoom, maxZoom, padding);
    },
    [store, padding],
  );

  const moveTo = useCallback(
    (viewport, duration = 900) =>
      rf.setViewport(viewport, { duration: reduced ? 0 : duration }),
    [rf, reduced],
  );

  /** Viewport that frames the whole universe, but never below a zoom where labels are
   *  readable. On phones and portrait tablets that means opening centred on "me" with the
   *  rest of the universe a pan away; the Fit control still shows everything. */
  const homeViewport = useCallback(() => {
    const fitted = viewportFor(nodes.map((n) => nodeRect(n.id, false)), MIN_ZOOM, 1.3);
    const floor = compact ? 0.62 : 0.5;
    if (fitted.zoom >= floor) return fitted;
    const { width, height } = store.getState();
    return { zoom: floor, x: width / 2 - positions.me[0] * floor, y: height / 2 - positions.me[1] * floor };
  }, [viewportFor, store, compact]);

  const home = useCallback((duration = 1000) => moveTo(homeViewport(), duration), [moveTo, homeViewport]);

  /** Frame a set of nodes; used by focus mode. */
  const fitIds = useCallback(
    (ids, duration = 1000) => {
      const rects = [...ids].map((id) => nodeRect(id, false));
      return moveTo(viewportFor(rects, MIN_ZOOM, 1.15), duration);
    },
    [moveTo, viewportFor],
  );

  const fitGroup = useCallback(
    (group, duration) => fitIds(groups[group], duration),
    [fitIds],
  );

  /** Frame a node, its card and its neighbours. Falls back to centring on the card when
   *  framing everything would zoom out too far to read it. */
  const focusNode = useCallback(
    (id, duration = 900) => {
      const rects = [id, ...neighbors[id]].map((n) => nodeRect(n, n === id));
      const fitted = viewportFor(rects, 0.01, 1.2);
      if (fitted.zoom >= minFocusZoom) return moveTo(fitted, duration);
      const centred = viewportFor([nodeRect(id, true)], minFocusZoom, minFocusZoom);
      return moveTo(centred, duration);
    },
    [moveTo, viewportFor, minFocusZoom],
  );

  const zoomToNode = useCallback(
    (id, zoom = 1.7, duration = 800) => {
      const [x, y] = positions[id];
      return rf.setCenter(x, y, { zoom, duration: reduced ? 0 : duration });
    },
    [rf, reduced],
  );

  const zoomBy = useCallback(
    (dir) => (dir > 0 ? rf.zoomIn({ duration: reduced ? 0 : 260 }) : rf.zoomOut({ duration: reduced ? 0 : 260 })),
    [rf, reduced],
  );

  return { homeViewport, home, fitIds, fitGroup, focusNode, zoomToNode, zoomBy, moveTo };
}
