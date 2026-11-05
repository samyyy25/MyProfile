import { useEffect, useRef } from "react";
import { LuArrowRight, LuArrowUpRight, LuDownload, LuFileBadge, LuMail, LuTrophy } from "react-icons/lu";
import { useImageAvailable } from "../hooks/useImageAvailable";
import { profile } from "../data/portfolioData";
import { entities, neighbors } from "../graph/buildGraph";
import { hasDetail } from "../graph/graphState";
import { BadgePills, CompletionBadge, EntryIcon, JourneyToggle } from "./Badges";

/** Shared "stretched button opens the detail view" behaviour, with the double-click guard. */
function useOpenGuard(onOpen) {
  const cardRef = useRef(null);
  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);
  const open = (event) => {
    event.stopPropagation();
    // The card appears under the cursor on the first click of a double-click; swallow the second.
    if (performance.now() - mountedAt.current < 450) return;
    onOpen?.(cardRef.current.getBoundingClientRect());
  };
  return { cardRef, open };
}

/** Premium card for a featured achievement: trophy, glow, both badges, and an expandable journey. */
function FeaturedAchievementCard({ id, onOpen, onSelect }) {
  const e = entities[id];
  const r = e.ref;
  const { cardRef, open } = useOpenGuard(onOpen);

  return (
    <article ref={cardRef} className="info-card info-card--featured">
      <span className="featured-glow" aria-hidden="true" />
      <div className="featured-head">
        <span className="medal" aria-hidden="true">
          <LuTrophy />
        </span>
        <p className="fp-eyebrow">
          Featured achievement · {r.team}
        </p>
      </div>
      <h3 className="fp-title">{r.title}</h3>
      <BadgePills badges={r.badges} />
      <p className="fp-tagline">{r.tagline}</p>
      <JourneyToggle steps={r.journey} />
      <div className="fp-actions">
        {r.projectIds.map((pid) => (
          <button
            key={pid}
            type="button"
            className="fp-link"
            onClick={(ev) => {
              ev.stopPropagation();
              onSelect(pid);
            }}
          >
            Built: {entities[pid].label} <LuArrowUpRight aria-hidden="true" />
          </button>
        ))}
        <span className="fp-cta" aria-hidden="true">
          Read more <LuArrowRight />
        </span>
      </div>
      <button type="button" className="fp-open" onClick={open} aria-label={`Open details for ${r.title}`} />
    </article>
  );
}

/** Card for a certification: badge, certificate preview and the link to the related project. */
function CertificationCard({ id, onOpen, onSelect, onCertificate }) {
  const e = entities[id];
  const r = e.ref;
  const { cardRef, open } = useOpenGuard(onOpen);
  const available = useImageAvailable(r.certificate.src);

  return (
    <article ref={cardRef} className="info-card info-card--cert">
      <div className="featured-head">
        <span className="medal medal--violet" aria-hidden="true">
          <EntryIcon icon={r.icon} className="medal__icon" />
        </span>
        <p className="fp-eyebrow">
          {r.type} · {r.date}
        </p>
      </div>
      <h3 className="fp-title">{r.title}</h3>
      <p className="info-card__meta">
        {r.org} · {r.place}
      </p>
      <CompletionBadge label={r.badge} />
      <div className="relation">
        <p className="relation__label">Related project</p>
        <p className="relation__text">{r.relation.summary}</p>
      </div>
      <div className="fp-actions">
        {available !== false && (
          <button
            type="button"
            className="fp-link fp-link--solid"
            onClick={(ev) => {
              ev.stopPropagation();
              onCertificate?.(id);
            }}
          >
            <LuFileBadge aria-hidden="true" /> View Certificate
          </button>
        )}
        <button
          type="button"
          className="fp-link"
          onClick={(ev) => {
            ev.stopPropagation();
            onSelect?.(r.relation.projectId);
          }}
        >
          {r.relation.action} <LuArrowUpRight aria-hidden="true" />
        </button>
        <span className="fp-cta" aria-hidden="true">
          Read more <LuArrowRight />
        </span>
      </div>
      <button type="button" className="fp-open" onClick={open} aria-label={`Open details for ${r.title}`} />
    </article>
  );
}

/** Floating card for me / experience / achievement / explore nodes. */
export function InfoCard({ id, onOpen, onSelect, onCertificate }) {
  const e = entities[id];
  const { cardRef, open } = useOpenGuard(onOpen);

  if (e.kind === "achievement" && e.ref.featured) {
    return <FeaturedAchievementCard id={id} onOpen={onOpen} onSelect={onSelect} />;
  }
  if (e.kind === "experience" && e.ref.certificate) {
    return <CertificationCard id={id} onOpen={onOpen} onSelect={onSelect} onCertificate={onCertificate} />;
  }

  const canOpen = hasDetail(id);
  const relatedProjects = e.ref?.projectIds ?? [];

  let eyebrow = "";
  let title = e.label;
  let text = e.ref?.tagline;
  let meta = null;

  if (e.kind === "me") {
    eyebrow = profile.role;
    title = profile.name;
    text = profile.headline;
  } else if (e.kind === "experience") {
    eyebrow = `${e.ref.type} · ${e.ref.date}`;
    title = e.ref.title;
    meta = e.ref.org;
  } else if (e.kind === "achievement") {
    eyebrow = e.ref.badge;
    title = e.ref.title;
    meta = [e.ref.date, e.ref.place].filter(Boolean).join(" · ");
  } else if (e.kind === "explore") {
    eyebrow = "Explore";
  }

  const action = e.ref?.action;
  const isContact = id === "contact";

  return (
    <article ref={cardRef} className={`info-card${e.kind === "me" ? " info-card--me" : ""}`}>
      {e.kind === "me" && (
        <div className="info-card__avatar">
          <img src={profile.photo} alt="" width="96" height="96" decoding="async" draggable="false" />
        </div>
      )}
      <div className="info-card__body">
        {eyebrow && <p className="fp-eyebrow">{eyebrow}</p>}
        <h3 className="fp-title">{title}</h3>
        {meta && <p className="info-card__meta">{meta}</p>}
        {text && <p className="fp-tagline">{text}</p>}
        {isContact && (
          <ul className="info-card__lines">
            <li>{profile.email}</li>
            <li>{profile.phone}</li>
            <li>{profile.location}</li>
          </ul>
        )}
        <div className="fp-actions">
          {action && (
            <a
              className="fp-link fp-link--solid"
              href={action.href}
              download={action.download}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noreferrer" : undefined}
            >
              {action.download ? <LuDownload aria-hidden="true" /> : isContact ? <LuMail aria-hidden="true" /> : <LuArrowUpRight aria-hidden="true" />}
              {action.label}
            </a>
          )}
          {relatedProjects.map((pid) => (
            <button
              key={pid}
              type="button"
              className="fp-link"
              onClick={(ev) => {
                ev.stopPropagation();
                onSelect?.(pid);
              }}
            >
              Related: {entities[pid].label} <LuArrowUpRight aria-hidden="true" />
            </button>
          ))}
          {canOpen && (
            <span className="fp-cta" aria-hidden="true">
              {e.kind === "me" ? "About me" : "Read more"} <LuArrowRight />
            </span>
          )}
        </div>
      </div>
      {canOpen && (
        <button
          type="button"
          className="fp-open"
          onClick={open}
          aria-label={`Open details for ${title}`}
        />
      )}
    </article>
  );
}

/** Compact card above a selected tech / hub node: what it connects to, as clickable chips. */
export function MiniCard({ id, onSelect }) {
  const e = entities[id];
  const related = [...neighbors[id]].map((n) => entities[n]).filter((n) => n.kind !== "hub" && n.kind !== "me");
  const projects = related.filter((n) => n.kind === "project");
  const MAX = 7;
  const shown = related.slice(0, MAX);

  let summary;
  if (e.kind === "tech") {
    summary = projects.length
      ? `Used in ${projects.length} project${projects.length === 1 ? "" : "s"}`
      : related.length
        ? "Part of my training"
        : "Part of my toolkit";
  } else {
    summary = `${related.length || neighbors[id].size} connected`;
  }

  return (
    <div className="mini-card" role="group" aria-label={`${e.label} connections`}>
      <p className="fp-eyebrow">{summary}</p>
      <h3 className="fp-title">{e.label}</h3>
      {shown.length > 0 && (
        <ul className="mini-card__chips">
          {shown.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                onClick={(ev) => {
                  ev.stopPropagation();
                  onSelect(n.id);
                }}
              >
                {n.label}
              </button>
            </li>
          ))}
          {related.length > MAX && <li className="mini-card__more">+{related.length - MAX} more</li>}
        </ul>
      )}
    </div>
  );
}
