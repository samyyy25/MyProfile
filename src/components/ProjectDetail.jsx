import { motion } from "framer-motion";
import {
  LuArrowLeft,
  LuArrowRight,
  LuArrowUpRight,
  LuAudioLines,
  LuChevronLeft,
  LuChevronRight,
  LuGithub,
  LuNetwork,
  LuTrophy,
} from "react-icons/lu";
import { projects } from "../data/portfolioData";
import { entities } from "../graph/buildGraph";
import { achievementsFor, awardTitle, badgesOf } from "../graph/graphState";
import { BadgePills } from "./Badges";

const EASE = [0.22, 1, 0.36, 1];

/** Case-study view for one project. Sections only render when the content actually exists. */
export default function ProjectDetail({ id, backLabel, onClose, onNavigate, onShowInGraph, reduced }) {
  const index = projects.findIndex((p) => p.id === id);
  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const [w, h] = project.imageSize;
  const awards = achievementsFor(id);
  const learning = Object.values(entities).filter(
    (e) => e.kind === "experience" && e.ref.type === "Certification" && e.ref.projectIds?.includes(id),
  );

  const connected = [
    ...project.techIds,
    ...Object.values(entities)
      .filter((e) => (e.kind === "achievement" || e.kind === "experience") && e.ref.projectIds?.includes(id))
      .map((e) => e.id),
  ];

  const rise = (delay) =>
    reduced
      ? {}
      : { initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 + delay, duration: 0.6, ease: EASE } };

  return (
    <div className="detail">
      <header className="detail__bar">
        <button type="button" className="detail__back" onClick={onClose} autoFocus>
          <LuArrowLeft aria-hidden="true" /> {backLabel}
        </button>
        <div className="detail__pager-mini">
          <button type="button" onClick={() => onNavigate(prev.id)} aria-label={`Previous project: ${prev.title}`}>
            <LuChevronLeft aria-hidden="true" />
          </button>
          <span aria-live="polite">
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <button type="button" onClick={() => onNavigate(next.id)} aria-label={`Next project: ${next.title}`}>
            <LuChevronRight aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="detail__scroll">
        <article className="detail__article" key={id}>
          <motion.header className="detail__head" {...rise(0)}>
            <p className="eyebrow">
              {project.featured && <span className="pill pill--accent">Featured</span>}
              {project.meta}
            </p>
            <h2 className="detail__title">{project.title}</h2>
            <p className="detail__subtitle">{project.subtitle}</p>
            {learning.map((l) => (
              <div key={l.id} className="detail__learning">
                <span className="medal medal--violet" aria-hidden="true">
                  <LuAudioLines />
                </span>
                <div>
                  <button type="button" onClick={() => onNavigate(l.id)}>
                    Related Learning: {l.ref.learningLabel ?? l.ref.title} <LuArrowUpRight aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
            {awards.map((a) => (
              <div key={a.id} className="detail__award">
                <p>
                  <LuTrophy aria-hidden="true" /> {awardTitle(a)}
                </p>
                <BadgePills badges={badgesOf(a)} />
              </div>
            ))}
            <div className="detail__actions">
              {project.live && (
                <a className="btn btn--solid" href={project.live} target="_blank" rel="noreferrer">
                  Live demo <LuArrowUpRight aria-hidden="true" />
                </a>
              )}
              {project.github && (
                <a className="btn" href={project.github} target="_blank" rel="noreferrer">
                  <LuGithub aria-hidden="true" /> GitHub
                </a>
              )}
              <button type="button" className="btn" onClick={() => onShowInGraph(id)}>
                <LuNetwork aria-hidden="true" /> Show in universe
              </button>
            </div>
          </motion.header>

          <motion.figure className="detail__figure" {...rise(0.1)}>
            <img src={project.image} alt={`${project.title} screenshot`} width={w} height={h} decoding="async" />
          </motion.figure>

          <motion.div className="detail__grid" {...rise(0.2)}>
            <div className="detail__main">
              {project.problem && (
                <section>
                  <h3>The problem</h3>
                  <p>{project.problem}</p>
                </section>
              )}
              {project.solution && (
                <section>
                  <h3>The solution</h3>
                  <p>{project.solution}</p>
                </section>
              )}
              {!project.problem && !project.solution && (
                <section>
                  <h3>Overview</h3>
                  <p>{project.overview}</p>
                </section>
              )}
              {project.quote && <blockquote className="detail__quote">“{project.quote}”</blockquote>}
              {project.outcomes && (
                <section>
                  <h3>Outcome</h3>
                  <ul className="detail__list">
                    {project.outcomes.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <aside className="detail__side">
              <section>
                <h3>Core features</h3>
                <ul className="detail__list">
                  {project.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>Tech stack</h3>
                <ul className="tag-list">
                  {project.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>Connected in the universe</h3>
                <ul className="tag-list tag-list--buttons">
                  {connected.map((nid) => (
                    <li key={nid}>
                      <button type="button" onClick={() => onShowInGraph(nid)} data-accent={entities[nid].accent}>
                        <i aria-hidden="true" />
                        {entities[nid].label}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
          </motion.div>

          <nav className="detail__pager" aria-label="More projects">
            <button type="button" onClick={() => onNavigate(prev.id)}>
              <span>Previous</span>
              <strong>
                <LuArrowLeft aria-hidden="true" /> {prev.title}
              </strong>
            </button>
            <button type="button" onClick={() => onNavigate(next.id)}>
              <span>Next</span>
              <strong>
                {next.title} <LuArrowRight aria-hidden="true" />
              </strong>
            </button>
          </nav>
        </article>
      </div>
    </div>
  );
}
