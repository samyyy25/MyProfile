import { createContext, useContext } from "react";

// Shared, read-mostly UI state for graph nodes and edges.
// { selectedId, hoverId, focusGroup, reduced, actions: { select, open, hover } }
export const GraphUIContext = createContext(null);

export function useGraphUI() {
  const ctx = useContext(GraphUIContext);
  if (!ctx) throw new Error("useGraphUI must be used inside <PortfolioCanvas>");
  return ctx;
}
