import { memo } from "react";
import { getStraightPath } from "@xyflow/react";
import { useGraphUI } from "../graph/GraphUIContext";
import { getEdgeState } from "../graph/graphState";

/**
 * Custom edge: a hairline that rests quietly, then draws itself bright and sends a trail of
 * light along it when either end is hovered or selected.
 * `pathLength="1"` normalises dash maths so the draw-in and pulse look the same on any edge.
 */
function GraphConnections({ source, target, sourceX, sourceY, targetX, targetY, data }) {
  const ui = useGraphUI();
  const state = getEdgeState(source, target, ui);
  const [path] = getStraightPath({ sourceX, sourceY, targetX, targetY });
  const lit = state === "active" || state === "hover";

  return (
    <g className={`gx-edge gx-edge--${data.kind} is-${state}`}>
      <path className="gx-edge__line" d={path} pathLength="1" />
      {lit && !ui.reduced && <path className="gx-edge__pulse" d={path} pathLength="1" />}
    </g>
  );
}

export default memo(GraphConnections);
