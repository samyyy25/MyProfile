import { useEffect, useRef } from "react";
import { LuArrowRight, LuArrowUpRight, LuGithub, LuTrophy } from "react-icons/lu";
import { achievementsFor, awardTitle, badgesOf } from "../graph/graphState";
import { BadgePills } from "./Badges";

/**
 * Project preview card. `variant="node"` floats on the graph beside a selected node,
 * `variant="grid"` is the same card reflowed for the explorer grid.
 * The whole card is one stretched button that opens the detail view; the Live Demo / GitHub
 * links sit above it so they stay independently clickable.
 */
export default function FeaturedProjectCard({ project, variant = "node", onOpen, priority = false }) {
  const cardRef = useRef(null);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  const open = (event) => {
    event.stopPropagation();
    // On the graph the card appears under the cursor on the first click of a double-click;
    // swallow the second click so double-click can zoom instead of opening the detail view.
    if (variant === "node" && performance.now() - mountedAt.current < 450) return;
    onOpen?.(cardRef.current.getBoundingClientRect());
  };

  const [w, h] = project.imageSize;
  const featured = !!project.featured;
  const awards = featured && variant === "grid" ? achievementsFor(project.id) : [];

  return (
    <article ref={cardRef} className={`fp-card fp-card--${variant}${featured ? " is-featured" : ""}`} data-project={project.id}>
      <div className="fp-media">
        {featured && <span className="fp-flag">Featured</span>}
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          width={w}
          height={h}
          loading={priority || variant === "node" ? "eager" : "lazy"}
          decoding="async"
          draggable="false"
        />
      </div>

      <div className="fp-body">
        <p className="fp-eyebrow">{project.meta}</p>
        <h3 className="fp-title">{project.title}</h3>
        <p className="fp-tagline">{project.tagline}</p>

        {awards.map((a) => (
          <div key={a.id} className="fp-award">
            <p>
              <LuTrophy aria-hidden="true" /> {a.ref.short ?? awardTitle(a)}{a.ref.team ? ` · ${a.ref.team}` : ""}
            </p>
            <BadgePills badges={badgesOf(a)} />
          </div>
        ))}

        <div className="fp-reveal">
          <div className="fp-reveal__inner">
            <ul className="fp-tags" aria-label="Technologies">
              {project.tech.slice(0, 5).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="fp-actions">
              {project.live && (
                <a className="fp-link" href={project.live} target="_blank" rel="noreferrer">
                  Live demo <LuArrowUpRight aria-hidden="true" />
                </a>
              )}
              {project.github && (
                <a className="fp-link" href={project.github} target="_blank" rel="noreferrer">
                  <LuGithub aria-hidden="true" /> GitHub
                </a>
              )}
              <span className="fp-cta" aria-hidden="true">
                Case study <LuArrowRight />
              </span>
            </div>
          </div>
        </div>
      </div>

      <button type="button" className="fp-open" onClick={open} aria-label={`Open ${project.title} case study`} />
    </article>
  );
}
