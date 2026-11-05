import { useId, useState } from "react";
import { LuAward, LuBadgeCheck, LuChevronDown, LuMedal } from "react-icons/lu";
import { ENTRY_ICONS } from "./entryIcons";

const ICONS = [LuMedal, LuAward];

/** Achievement badges such as "2nd — State Level" and "Top 10 — Round 2". */
export function BadgePills({ badges, className = "" }) {
  if (!badges?.length) return null;
  return (
    <ul className={`badge-row ${className}`} aria-label="Achievements">
      {badges.map((badge, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <li key={badge} className={`badge badge--${i % 2 === 0 ? "violet" : "orange"}`}>
            <Icon aria-hidden="true" />
            {badge}
          </li>
        );
      })}
    </ul>
  );
}

/** The hackathon journey as a vertical timeline. */
export function JourneyList({ steps, id }) {
  return (
    <ol className="journey" id={id}>
      {steps.map((step) => (
        <li key={step.label} className="journey__step">
          <span className="journey__dot" aria-hidden="true" />
          <p className="journey__label">{step.label}</p>
          <p className="journey__title">{step.title}</p>
          <p className="journey__result">{step.result}</p>
        </li>
      ))}
    </ol>
  );
}

/** Disclosure that reveals the full journey. Sits above a card's stretched "open" button. */
export function JourneyToggle({ steps, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <div className="journey-wrap">
      <button
        type="button"
        className="journey-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={(event) => {
          event.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        {open ? "Hide the full journey" : "Show the full journey"}
        <LuChevronDown aria-hidden="true" />
      </button>
      <div className="journey-panel" data-open={open} inert={open ? undefined : true}>
        <div className="journey-panel__inner">
          <JourneyList steps={steps} id={panelId} />
        </div>
      </div>
    </div>
  );
}

/** "Challenge Completed" style status badge: a finished learning milestone, not a placing. */
export function CompletionBadge({ label }) {
  return (
    <ul className="badge-row" aria-label="Status">
      <li className="badge badge--green">
        <LuBadgeCheck aria-hidden="true" />
        {label}
      </li>
    </ul>
  );
}

/** Icon a journey entry opted into (`icon: "waveform"` etc.); renders nothing otherwise. */
export function EntryIcon({ icon, className = "entry-icon" }) {
  const Icon = ENTRY_ICONS[icon];
  return Icon ? <Icon className={className} aria-hidden="true" /> : null;
}
