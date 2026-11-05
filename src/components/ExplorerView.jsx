import { AnimatePresence, motion } from "framer-motion";
import {
  LuArrowUpRight,
  LuDownload,
  LuFileBadge,
  LuGithub,
  LuLinkedin,
  LuMail,
  LuMapPin,
  LuNetwork,
  LuTrophy,
} from "react-icons/lu";
import {
  achievements,
  experience,
  focusCategories,
  profile,
  projects,
  tech,
  topics,
} from "../data/portfolioData";
import { neighbors, entities } from "../graph/buildGraph";
import { useImageAvailable } from "../hooks/useImageAvailable";
import { BadgePills, CompletionBadge, EntryIcon, JourneyToggle } from "./Badges";
import FeaturedProjectCard from "./FeaturedProjectCard";

const EASE = [0.22, 1, 0.36, 1];

function ProjectsPanel({ onOpenDetail }) {
  return (
    <div className="explorer__grid">
      {projects.map((p, i) => (
        <FeaturedProjectCard
          key={p.id}
          project={p}
          variant="grid"
          priority={i < 3}
          onOpen={(rect) => onOpenDetail(p.id, rect)}
        />
      ))}
    </div>
  );
}

function SkillsPanel() {
  return (
    <div className="skills">
      {["interface", "foundation", "ai"].map((topic) => (
        <section key={topic} className="skills__group" data-accent={topic}>
          <h3>
            <i aria-hidden="true" />
            {topics[topic].label}
          </h3>
          <ul>
            {tech
              .filter((t) => t.topic === topic)
              .map((t) => {
                const count = [...neighbors[t.id]].filter((n) => entities[n].kind === "project").length;
                return (
                  <li key={t.id}>
                    <span>{t.label}</span>
                    {count > 0 && <small>{count} project{count === 1 ? "" : "s"}</small>}
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </div>
  );
}

/** Certificate + related-project actions under a journey entry that has a certificate. */
function TimelineActions({ entry, onOpenDetail, onViewCertificate }) {
  const available = useImageAvailable(entry.certificate.src);
  return (
    <div className="timeline__actions">
      {available !== false && (
        <button type="button" className="btn btn--solid" onClick={() => onViewCertificate(entry.id)}>
          <LuFileBadge aria-hidden="true" /> View Certificate
        </button>
      )}
      <button
        type="button"
        className="btn"
        onClick={(ev) => onOpenDetail(entry.relation.projectId, ev.currentTarget.getBoundingClientRect())}
      >
        {entry.relation.action} <LuArrowUpRight aria-hidden="true" />
      </button>
    </div>
  );
}

function ExperiencePanel({ onOpenDetail, onViewCertificate }) {
  return (
    <ol className="timeline">
      {experience.map((e) => (
        <li key={e.id} className="timeline__item">
          <span className="timeline__dot" aria-hidden="true" />
          <p className="eyebrow">
            <EntryIcon icon={e.icon} />
            {e.type} · {e.date}
            {e.current && <span className="pill">Current</span>}
          </p>
          <h3>{e.title}</h3>
          <p className="timeline__org">
            {e.org}
            {e.place ? ` — ${e.place}` : ""}
          </p>
          {e.badge && <CompletionBadge label={e.badge} />}
          <p className="timeline__text">{e.description}</p>
          {e.certificate && (
            <TimelineActions entry={e} onOpenDetail={onOpenDetail} onViewCertificate={onViewCertificate} />
          )}
          {!e.relation && (e.projectIds ?? []).map((pid) => (
            <button
              key={pid}
              type="button"
              className="entry-card__link"
              onClick={(ev) => onOpenDetail(pid, ev.currentTarget.getBoundingClientRect())}
            >
              Related project: {projects.find((p) => p.id === pid).title} <LuArrowUpRight aria-hidden="true" />
            </button>
          ))}
        </li>
      ))}
    </ol>
  );
}

function AchievementsPanel({ onOpenDetail }) {
  const openProject = (pid) => (e) => onOpenDetail(pid, e.currentTarget.getBoundingClientRect());
  return (
    <div className="explorer__grid explorer__grid--wide">
      {achievements.map((a) =>
        a.featured ? (
          <article key={a.id} className="entry-card entry-card--featured">
            <span className="featured-glow" aria-hidden="true" />
            <LuTrophy className="featured-watermark" aria-hidden="true" />
            <div className="featured-head">
              <span className="medal" aria-hidden="true">
                <LuTrophy />
              </span>
              <p className="eyebrow">Featured achievement · {a.team}</p>
            </div>
            <h3>{a.title}</h3>
            <BadgePills badges={a.badges} />
            <p className="entry-card__text">{a.description}</p>
            <JourneyToggle steps={a.journey} />
            {a.projectIds.map((pid) => (
              <button key={pid} type="button" className="entry-card__link" onClick={openProject(pid)}>
                Built here: {projects.find((p) => p.id === pid).title} <LuArrowUpRight aria-hidden="true" />
              </button>
            ))}
          </article>
        ) : (
          <article key={a.id} className="entry-card">
            <p className="eyebrow">{a.badge}</p>
            <h3>{a.title}</h3>
            <p className="entry-card__meta">{[a.date, a.place].filter(Boolean).join(" · ")}</p>
            <p className="entry-card__text">{a.description}</p>
            {a.projectIds.map((pid) => (
              <button key={pid} type="button" className="entry-card__link" onClick={openProject(pid)}>
                Related project: {projects.find((p) => p.id === pid).title} <LuArrowUpRight aria-hidden="true" />
              </button>
            ))}
          </article>
        ),
      )}
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="about">
      <img className="about__photo" src={profile.photo} alt={profile.name} width="240" height="240" decoding="async" />
      <div className="about__body">
        {profile.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="about__avail">{profile.availability}</p>
        <ul className="about__lines">
          <li>
            <LuMail aria-hidden="true" /> <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          <li>
            <LuMapPin aria-hidden="true" /> {profile.location}
          </li>
        </ul>
        <div className="detail__actions">
          <a className="btn btn--solid" href={profile.resume} download={profile.resumeFilename}>
            <LuDownload aria-hidden="true" /> Download resume
          </a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
            <LuGithub aria-hidden="true" /> GitHub
          </a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
            <LuLinkedin aria-hidden="true" /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Grid explorer: the same content as the graph, laid out for phones, tablets and anyone who
 * prefers a conventional scroll. Categories are shared with the graph's focus selector.
 */
export default function ExplorerView({ focus, onFocusChange, onOpenDetail, onShowGraph, onViewCertificate, reduced }) {
  const tab = focus ?? "projects";

  const panel = {
    projects: <ProjectsPanel onOpenDetail={onOpenDetail} />,
    skills: <SkillsPanel />,
    experience: <ExperiencePanel onOpenDetail={onOpenDetail} onViewCertificate={onViewCertificate} />,
    achievements: <AchievementsPanel onOpenDetail={onOpenDetail} />,
    about: <AboutPanel />,
  }[tab];

  return (
    <main className="explorer" id="explorer">
      <div className="explorer__inner">
        <header className="explorer__head">
          <p className="eyebrow">{profile.name}</p>
          <h1>{profile.headline}</h1>
          <button type="button" className="explorer__graph-link" onClick={onShowGraph}>
            <LuNetwork aria-hidden="true" /> Explore as an interactive universe <LuArrowUpRight aria-hidden="true" />
          </button>
        </header>

        <div className="explorer__tabs" role="tablist" aria-label="Categories">
          {focusCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={tab === c.id}
              aria-controls="explorer-panel"
              tabIndex={tab === c.id ? 0 : -1}
              onClick={() => onFocusChange(c.id)}
              onKeyDown={(e) => {
                const i = focusCategories.findIndex((x) => x.id === c.id);
                const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
                if (!step) return;
                e.preventDefault();
                const target = focusCategories[(i + step + focusCategories.length) % focusCategories.length];
                onFocusChange(target.id);
                document.getElementById(`tab-${target.id}`)?.focus();
              }}
            >
              {tab === c.id && (
                <motion.span layoutId="explorer-tab" className="explorer__tab-pill" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
              )}
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            id="explorer-panel"
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            {panel}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
