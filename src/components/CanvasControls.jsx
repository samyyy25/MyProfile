import { LuLocateFixed, LuMinus, LuPlus, LuScan } from "react-icons/lu";
import Magnetic from "./Magnetic";

/** Bottom-right zoom cluster. Reset clears selection/focus; Fit frames everything. */
export default function CanvasControls({ onZoomIn, onZoomOut, onReset, onFit }) {
  const items = [
    { label: "Zoom in", icon: LuPlus, onClick: onZoomIn },
    { label: "Zoom out", icon: LuMinus, onClick: onZoomOut },
    { label: "Reset view", icon: LuLocateFixed, onClick: onReset },
    { label: "Fit all nodes to screen", icon: LuScan, onClick: onFit },
  ];
  return (
    <div className="canvas-controls" role="group" aria-label="Graph view controls">
      {items.map(({ label, icon: Icon, onClick }) => (
        <Magnetic key={label} strength={0.22}>
          <button type="button" className="chrome-btn chrome-btn--square" onClick={onClick} aria-label={label} title={label}>
            <Icon aria-hidden="true" />
          </button>
        </Magnetic>
      ))}
    </div>
  );
}
