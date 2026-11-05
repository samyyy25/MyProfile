import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ReactFlow, ReactFlowProvider, useReactFlow, useStoreApi } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { edges, entities, neighbors, nodes as baseNodes, positions } from "../graph/buildGraph";
import { GraphUIContext } from "../graph/GraphUIContext";
import { CARD_KINDS, hasDetail, isArrowKey, nextInDirection } from "../graph/graphState";
import { MAX_ZOOM, MIN_ZOOM, useCamera } from "../graph/useCamera";
import CustomGraphNode from "./CustomGraphNode";
import GraphConnections from "./GraphConnections";
import CanvasControls from "./CanvasControls";

// Defined once, outside render, so React Flow never sees new type maps.
const nodeTypes = { graphNode: CustomGraphNode };
const edgeTypes = { graph: GraphConnections };

const xs = Object.values(positions).map((p) => p[0]);
const ys = Object.values(positions).map((p) => p[1]);
const TRANSLATE_EXTENT = [
  [Math.min(...xs) - 800, Math.min(...ys) - 700],
  [Math.max(...xs) + 800, Math.max(...ys) + 700],
];

const ALL_IDS = Object.keys(entities);

/** Start the camera pulled back a little so the intro can glide in. */
function scaleAround(viewport, factor, width, height) {
  const zoom = viewport.zoom * factor;
  return {
    zoom,
    x: width / 2 - ((width / 2 - viewport.x) / viewport.zoom) * zoom,
    y: height / 2 - ((height / 2 - viewport.y) / viewport.zoom) * zoom,
  };
}

function Canvas({ selectedId, onSelect, focus, onOpenDetail, onViewCertificate, onReset, resetToken, ready, theme, compact, reduced, onInteract }) {
  const rf = useReactFlow();
  const store = useStoreApi();
  const camera = useCamera({ reduced, compact });
  const { home, fitGroup, fitIds, focusNode, zoomToNode, zoomBy, homeViewport } = camera;

  const rootRef = useRef(null);
  const [hoverId, setHoverId] = useState(null);
  const userMoved = useRef(false);
  const started = useRef(false);
  // Latest values for effects that must not re-run when they change.
  const latest = useRef({});
  useEffect(() => {
    latest.current = { selectedId, focus, home, reduced };
  });

  // The selected node renders above its neighbours (its card overlaps them).
  const nodes = useMemo(
    () => (selectedId ? baseNodes.map((n) => (n.id === selectedId ? { ...n, zIndex: 1000 } : n)) : baseNodes),
    [selectedId],
  );

  const originFor = useCallback((id) => {
    const el = rootRef.current?.querySelector(`.react-flow__node[data-id="${id}"] .gx-card-anchor > *`);
    return el ? el.getBoundingClientRect() : null;
  }, []);

  const actions = useMemo(
    () => ({
      select: (id) => onSelect(id),
      open: (id, rect) => onOpenDetail(id, rect),
      certificate: (id) => onViewCertificate(id),
      hover: setHoverId,
    }),
    [onSelect, onOpenDetail, onViewCertificate],
  );
  const ui = useMemo(
    () => ({ selectedId, hoverId, focusGroup: focus, reduced, actions }),
    [selectedId, hoverId, focus, reduced, actions],
  );

  // --- camera placement -----------------------------------------------------------------
  const placeStart = useCallback(() => {
    const place = () => {
      const { width, height } = store.getState();
      if (!width || !height) {
        requestAnimationFrame(place); // container not measured yet
        return;
      }
      const factor = latest.current.reduced ? 1 : 0.84;
      rf.setViewport(scaleAround(homeViewport(), factor, width, height), { duration: 0 });
    };
    place();
  }, [rf, store, homeViewport]);

  // When the intro hands over, glide to wherever the page state says we should be.
  useEffect(() => {
    if (!ready) return;
    started.current = true;
    const { selectedId: sel, focus: foc } = latest.current;
    if (sel) focusNode(sel, 1400);
    else if (foc) fitGroup(foc, 1400);
    else home(1700);
  }, [ready, focusNode, fitGroup, home]);

  useEffect(() => {
    if (started.current && selectedId) focusNode(selectedId);
  }, [selectedId, focusNode]);

  useEffect(() => {
    if (!started.current) return;
    if (focus) fitGroup(focus);
    else if (!latest.current.selectedId) home();
  }, [focus, fitGroup, home]);

  // The monogram in the top bar asks for a fresh start.
  useEffect(() => {
    if (!started.current || !resetToken) return;
    userMoved.current = false;
    latest.current.home(900);
  }, [resetToken]);

  // Re-frame on resize (rotation, devtools) unless the visitor has taken the camera.
  useEffect(() => {
    const el = rootRef.current;
    let timer;
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const l = latest.current;
        if (started.current && !userMoved.current && !l.selectedId && !l.focus) l.home(0);
      }, 140);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // --- interaction ----------------------------------------------------------------------
  const pick = useCallback(
    (id) => {
      onSelect(id);
      requestAnimationFrame(() => {
        rootRef.current
          ?.querySelector(`[data-node-button="${id}"]`)
          ?.focus({ preventScroll: true });
      });
    },
    [onSelect],
  );

  const handleNodeClick = useCallback(
    (event, node) => {
      onInteract?.();
      const id = node.id;
      if (id !== selectedId) {
        onSelect(id);
        return;
      }
      // Re-activating the selected node: Enter/Space opens details, a click on a plain node toggles it off.
      if (event.detail === 0 && hasDetail(id)) onOpenDetail(id, originFor(id));
      else if (!CARD_KINDS.has(entities[id].kind)) onSelect(null);
    },
    [selectedId, onSelect, onOpenDetail, onInteract, originFor],
  );

  const handleNodeDoubleClick = useCallback(
    (_event, node) => {
      userMoved.current = true;
      zoomToNode(node.id, CARD_KINDS.has(entities[node.id].kind) ? 1.55 : 2);
    },
    [zoomToNode],
  );

  const handlePaneClick = useCallback(() => {
    onInteract?.();
    if (selectedId) onSelect(null);
  }, [selectedId, onSelect, onInteract]);

  const handleMoveStart = useCallback(
    (event) => {
      if (!event) return; // programmatic camera moves pass no event
      userMoved.current = true;
      onInteract?.();
    },
    [onInteract],
  );

  const handleReset = useCallback(() => {
    userMoved.current = false;
    onReset();
    home(900);
  }, [onReset, home]);

  const handleFit = useCallback(() => {
    userMoved.current = false;
    if (selectedId) focusNode(selectedId);
    else if (focus) fitGroup(focus);
    else fitIds(ALL_IDS);
  }, [selectedId, focus, focusNode, fitGroup, fitIds]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const { key } = event;
      if (isArrowKey(key)) {
        event.preventDefault();
        if (!selectedId) pick("me");
        else {
          const next = nextInDirection(selectedId, key, positions);
          if (next) pick(next);
        }
      } else if (key === "Escape" && selectedId) {
        onSelect(null);
      } else if (key === "+" || key === "=") {
        zoomBy(1);
      } else if (key === "-" || key === "_") {
        zoomBy(-1);
      } else if (key === "0") {
        handleReset();
      } else if (key === "f" || key === "F") {
        handleFit();
      }
    },
    [selectedId, pick, onSelect, zoomBy, handleReset, handleFit],
  );

  const announcement = selectedId
    ? `${entities[selectedId].label} selected, ${neighbors[selectedId].size} connections.`
    : "";

  return (
    <GraphUIContext.Provider value={ui}>
      <div
        ref={rootRef}
        className={`canvas${ready ? " is-ready" : ""}`}
        tabIndex={0}
        role="group"
        aria-label="Interactive portfolio graph. Use the arrow keys to move between nodes, Enter to open, Escape to clear, plus and minus to zoom."
        onKeyDown={handleKeyDown}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodeOrigin={[0.5, 0.5]}
          defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          translateExtent={TRANSLATE_EXTENT}
          colorMode={theme}
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
          edgesFocusable={false}
          elementsSelectable={false}
          autoPanOnNodeFocus={false}
          disableKeyboardA11y
          deleteKeyCode={null}
          selectionKeyCode={null}
          multiSelectionKeyCode={null}
          zoomOnDoubleClick={false}
          panOnDrag
          zoomOnScroll
          zoomOnPinch
          attributionPosition={compact ? "bottom-right" : "bottom-center"}
          onInit={placeStart}
          onNodeClick={handleNodeClick}
          onNodeDoubleClick={handleNodeDoubleClick}
          onPaneClick={handlePaneClick}
          onMoveStart={handleMoveStart}
        />

        <CanvasControls
          onZoomIn={() => zoomBy(1)}
          onZoomOut={() => zoomBy(-1)}
          onReset={handleReset}
          onFit={handleFit}
        />

        <p className="canvas-hint">
          <span className="canvas-hint__pointer">Scroll to zoom · Drag to explore · Click nodes to discover</span>
          <span className="canvas-hint__touch">Pinch to zoom · Drag to explore · Tap nodes to discover</span>
        </p>

        <div className="sr-only" aria-live="polite">
          {announcement}
        </div>
      </div>
    </GraphUIContext.Provider>
  );
}

export default function PortfolioCanvas(props) {
  return (
    <ReactFlowProvider>
      <Canvas {...props} />
    </ReactFlowProvider>
  );
}
