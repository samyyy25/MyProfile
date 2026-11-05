import { memo, useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { AnimatePresence, motion } from "framer-motion";
import { LuFileText, LuGithub, LuLinkedin, LuMail, LuTrophy } from "react-icons/lu";
import { useGraphUI } from "../graph/GraphUIContext";
import { CARD_KINDS, getNodeState } from "../graph/graphState";
import { entities } from "../graph/buildGraph";
import FeaturedProjectCard from "./FeaturedProjectCard";
import { EntryIcon } from "./Badges";
import { InfoCard, MiniCard } from "./NodeCards";

const EXPLORE_ICONS = { resume: LuFileText, github: LuGithub, linkedin: LuLinkedin, contact: LuMail };
const KIND_LABEL = {
  me: "about me",
  project: "project",
  tech: "technology",
  hub: "topic",
  experience: "experience",
  achievement: "achievement",
  explore: "link",
};

// Warm the full-size image while the pointer is still travelling to the node.
const warmed = new Set();
function warm(src) {
  if (!src || warmed.has(src)) return;
  warmed.add(src);
  const img = new Image();
  img.src = src;
}

function Orb({ id, kind, image, featured, icon }) {
  if (icon) {
    return (
      <span className="gx-orb gx-orb--entry">
        <EntryIcon icon={icon} className="gx-orb__icon" />
      </span>
    );
  }
  if (kind === "achievement" && featured) {
    return (
      <span className="gx-orb gx-orb--trophy">
        <LuTrophy aria-hidden="true" />
      </span>
    );
  }
  if (kind === "me" || kind === "project") {
    return (
      <span className="gx-orb gx-orb--image">
        <img src={image} alt="" width="96" height="96" decoding="async" draggable="false" />
      </span>
    );
  }
  if (kind === "explore") {
    const Icon = EXPLORE_ICONS[id];
    return (
      <span className="gx-orb gx-orb--icon">
        <Icon aria-hidden="true" />
      </span>
    );
  }
  return <span className="gx-orb" />;
}

function CustomGraphNode({ id, data }) {
  const ui = useGraphUI();
  const { kind, label, sublabel, accent, image, size, featured, icon } = data;
  const state = getNodeState(id, ui);
  const hasCard = state.selected && CARD_KINDS.has(kind);
  const hasMini = state.selected && !CARD_KINDS.has(kind);
  const { actions } = ui;

  const onEnter = useCallback(
    (event) => {
      if (event.pointerType === "touch") return;
      actions.hover(id);
      if (kind === "project") warm(entities[id].ref.image);
    },
    [actions, id, kind],
  );
  const onLeave = useCallback(() => actions.hover(null), [actions]);
  const onOpen = useCallback((rect) => actions.open(id, rect), [actions, id]);

  const className = [
    "gx-node",
    `gx-${kind}`,
    featured && "is-featured",
    icon && "has-icon",
    state.selected && "is-selected",
    state.related && "is-related",
    state.hovered && "is-hovered",
    state.hint && "is-hint",
    state.dimmed && "is-dimmed",
    hasCard && "has-card",
  ]
    .filter(Boolean)
    .join(" ");

  const accessibleName = [
    label,
    sublabel && kind !== "me" ? sublabel : null,
    featured ? `featured ${KIND_LABEL[kind]}` : KIND_LABEL[kind],
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className={className}
      data-accent={accent}
      style={{
        "--enter": `${data.enter}ms`,
        "--float-dur": `${data.floatDur}s`,
        "--float-delay": `${data.floatDelay}s`,
      }}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <Handle type="target" position={Position.Top} className="gx-handle" isConnectable={false} />
      <Handle type="source" position={Position.Top} className="gx-handle" isConnectable={false} />

      <button
        type="button"
        className="gx-hit"
        aria-label={accessibleName}
        aria-pressed={state.selected}
        data-node-button={id}
        style={{ width: size, height: size }}
      >
        <Orb id={id} kind={kind} image={image} featured={featured} icon={icon} />
      </button>

      {!state.selected && (entities[id].ref?.relation?.summary ?? entities[id].ref?.tagline) && (
        <span className="gx-peek" aria-hidden="true">
          {entities[id].ref.relation?.summary ?? entities[id].ref.tagline}
        </span>
      )}

      <span className="gx-label" aria-hidden="true">
        <span className="gx-label__main">{label}</span>
        {sublabel && <span className="gx-label__sub">{sublabel}</span>}
      </span>

      <AnimatePresence>
        {hasCard && (
          <motion.div
            key="card"
            className={`gx-card-anchor${ui.scrollCards ? " nopan nowheel" : ""}`}
            style={{ x: "-50%", y: "-50%" }}
            initial={ui.reduced ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={ui.reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 340, damping: 30, mass: 0.8 }}
          >
            {kind === "project" ? (
              <FeaturedProjectCard project={entities[id].ref} variant="node" onOpen={onOpen} />
            ) : (
              <InfoCard id={id} onOpen={onOpen} onSelect={actions.select} onCertificate={actions.certificate} />
            )}
          </motion.div>
        )}
        {hasMini && (
          <motion.div
            key="mini"
            className="gx-mini-anchor"
            style={{ x: "-50%" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.22 }}
          >
            <MiniCard id={id} onSelect={actions.select} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(CustomGraphNode);
