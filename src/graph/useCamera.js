import { useCallback } from "react";
import { getViewportForBounds, useReactFlow, useStoreApi } from "@xyflow/react";
import { entities, groups, neighbors, nodes, positions } from "./buildGraph";
import { CARD_KINDS } from "./graphState";

export const MIN_ZOOM = 0.2;
export const MAX_ZOOM = 2.4;

// Approximate on-screen footprint of a floating card, in world units (zoom 1).
const CARD = { w: 340, h: 300 };

/** Space (px) the floating chrome takes at each edge, by screen shape. */
export function insetsFor(width, height) {
  if (height <= 520) return { top: 60, bottom: 66, left: 12, right: 68 }; // landscape phones
  if (width <= 760) return { top: 76, bottom: 92, left: 12, right: 12 }; // phones
  return { top: 88, bottom: 100, left: 28, right: 28 };
}

/** Smallest zoom at which a focused card is still comfortable to read. */
function minFocusZoomFor(width, height) {
  if (width <= 760) return 0.85;
  if (height <= 520) return 0.85; // short: stay readable, the card scrolls inside itself
  return 0.6;
}

/** Lowest zoom the "home" view will use before it stops fitting everything and centres on me. */
function homeFloorFor(width, height) {
  if (width <= 760 || height <= 520) return 0.62;
  if (width < 1100) return 0.56;
  return 0.5;
}

/** Big monitors get a bigger universe, not a small one floating in empty space. */
function homeMaxZoomFor(width) {
  return Math.min(2.2, Math.max(1.3, width / 1700));
}

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
 * Framing adapts to the real container size: phones, landscape phones, tablets, laptops and 4K.
 */
export function useCamera({ reduced }) {
  const rf = useReactFlow();
  const store = useStoreApi();

  const size = useCallback(() => {
    const { width, height } = store.getState();
    return { width, height };
  }, [store]);

  const insets = useCallback(() => {
    const { width, height } = size();
    return insetsFor(width, height);
  }, [size]);

  const viewportFor = useCallback(
    (rects, minZoom, maxZoom) => {
      const { width, height } = size();
      const i = insetsFor(width, height);
      const padding = { top: `${i.top}px`, bottom: `${i.bottom}px`, left: `${i.left}px`, right: `${i.right}px` };
      return getViewportForBounds(union(rects), width, height, minZoom, maxZoom, padding);
    },
    [size],
  );

  const moveTo = useCallback(
    (viewport, duration = 900) =>
      rf.setViewport(viewport, { duration: reduced ? 0 : duration }),
    [rf, reduced],
  );

  /** Viewport that frames the whole universe, but never below a zoom where labels are
   *  readable. On phones and small tablets that means opening centred on "me" with the
   *  rest of the universe a pan away; the Fit control still shows everything. */
  const homeViewport = useCallback(() => {
    const { width, height } = size();
    const fitted = viewportFor(nodes.map((n) => nodeRect(n.id, false)), MIN_ZOOM, homeMaxZoomFor(width));
    const floor = homeFloorFor(width, height);
    if (fitted.zoom >= floor) return fitted;
    return { zoom: floor, x: width / 2 - positions.me[0] * floor, y: height / 2 - positions.me[1] * floor };
  }, [viewportFor, size]);

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
      const { width, height } = size();
      const minFocusZoom = minFocusZoomFor(width, height);
      const rects = [id, ...neighbors[id]].map((n) => nodeRect(n, n === id));
      const fitted = viewportFor(rects, 0.01, 1.2);
      if (fitted.zoom >= minFocusZoom) return moveTo(fitted, duration);
      const centred = viewportFor([nodeRect(id, true)], minFocusZoom, minFocusZoom);
      return moveTo(centred, duration);
    },
    [moveTo, viewportFor, size],
  );

  /**
   * A card's real size depends on its content (an expanded journey is far taller than the 300px
   * the framing assumes). Measure the rendered card and, if it would spill past the usable area,
   * ease the zoom down just enough, and re-centre it, so all of it is on screen.
   * Never zooms in, and never below a floor where text would be unreadable (the card itself is
   * capped to the usable height in CSS, so what doesn't fit scrolls inside it).
   */
  const fitCard = useCallback(
    (id, cardEl, duration = 500) => {
      if (!cardEl) return;
      const { width, height } = size();
      const i = insetsFor(width, height);
      const availW = width - i.left - i.right;
      const availH = height - i.top - i.bottom;
      const cardW = cardEl.offsetWidth;
      const cardH = cardEl.offsetHeight;
      if (!cardW || !cardH) return;

      const [tx, ty, current] = store.getState().transform;
      const zoom = Math.min(current, Math.max(0.7, Math.min(availW / cardW, availH / cardH)));
      const shrinks = zoom < current - 0.01;
      const [wx, wy] = positions[id];
      // where the card sits on screen right now (it is centred on its node)
      const cx = tx + wx * current;
      const cy = ty + wy * current;
      const hw = (cardW * current) / 2;
      const hh = (cardH * current) / 2;
      const spills =
        cx - hw < i.left - 2 || cx + hw > width - i.right + 2 || cy - hh < i.top - 2 || cy + hh > height - i.bottom + 2;
      if (!shrinks && !spills) return; // already fits where it is

      return moveTo(
        { zoom, x: i.left + availW / 2 - wx * zoom, y: i.top + availH / 2 - wy * zoom },
        duration,
      );
    },
    [size, store, moveTo],
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

  return { homeViewport, home, fitIds, fitGroup, focusNode, fitCard, insets, zoomToNode, zoomBy, moveTo };
}
