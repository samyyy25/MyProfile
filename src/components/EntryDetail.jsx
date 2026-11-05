import { motion } from "framer-motion";
import {
  LuArrowLeft,
  LuArrowUpRight,
  LuDownload,
  LuFileBadge,
  LuGithub,
  LuLinkedin,
  LuMail,
  LuMapPin,
  LuNetwork,
  LuPhone,
} from "react-icons/lu";
import { profile, projects } from "../data/portfolioData";
import { entities } from "../graph/buildGraph";
import { useImageAvailable } from "../hooks/useImageAvailable";
import { BadgePills, CompletionBadge, EntryIcon, JourneyList } from "./Badges";

const EASE = [0.22, 1, 0.36, 1];

/** Certificate thumbnail + facts + "View Certificate"; hidden when the image file isn't there. */
function CertificateBlock({ certificate, onView }) {
  const available = useImageAvailable(certificate.src);
  if (available === false) return null;
  return (
    <section className="detail__related">
      <h3>Certificate</h3>
      <button type="button" className="cert-thumb" onClick={onView} aria-label="View certificate in a larger preview">
        <img src={certificate.src} alt={certificate.alt} loading="lazy" decoding="async" draggable="false" />
        <span className="cert-thumb__cta">
          <LuFileBadge aria-hidden="true" /> View Certificate
        </span>
      </button>
      <dl className="cert-facts">
        <div>
          <dt>Issuer</dt>
          <dd>{certificate.issuer}</dd>
        </div>
        <div>
          <dt>Awarded to</dt>
          <dd>{certificate.recipient}</dd>
        </div>
        <div>
          <dt>Program</dt>
          <dd>{certificate.program}</dd>
        </div>
        <div>
          <dt>Completed</dt>
          <dd>{certificate.completion}</dd>
        </div>
      </dl>
    </section>
  );
}

/** Detail view for journey entries, hackathons, the About section and Contact. */
export default function EntryDetail({ id, backLabel, onClose, onNavigate, onShowInGraph, onViewCertificate, reduced }) {
  const e = entities[id];
  const rise = reduced
    ? {}
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3, duration: 0.6, ease: EASE } };

  let body;

  if (e.kind === "me") {
    body = (
      <>
        <header className="detail__head detail__head--row">
          <img className="detail__avatar" src={profile.photo} alt={profile.name} width="120" height="120" decoding="async" />
          <div>
            <p className="eyebrow">About me</p>
            <h2 className="detail__title">{profile.name}</h2>
            <p className="detail__subtitle">{profile.headline}</p>
          </div>
        </header>
        <div className="detail__prose">
          {profile.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>{profile.availability}</p>
        </div>
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
      </>
    );
  } else if (id === "contact") {
    body = (
      <>
        <header className="detail__head">
          <p className="eyebrow">Let's connect</p>
          <h2 className="detail__title">Let's build something amazing together.</h2>
          <p className="detail__subtitle">{profile.availability}</p>
        </header>
        <ul className="contact-list">
          <li>
            <LuMail aria-hidden="true" />
            <div>
              <span>Email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
          </li>
          <li>
            <LuPhone aria-hidden="true" />
            <div>
              <span>Phone</span>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
            </div>
          </li>
          <li>
            <LuMapPin aria-hidden="true" />
            <div>
              <span>Location</span>
              <p>{profile.location}</p>
            </div>
          </li>
        </ul>
        <div className="detail__actions">
          <a className="btn btn--solid" href={`mailto:${profile.email}`}>
            <LuMail aria-hidden="true" /> Email me
          </a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
            <LuGithub aria-hidden="true" /> GitHub
          </a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
            <LuLinkedin aria-hidden="true" /> LinkedIn
          </a>
        </div>
      </>
    );
  } else if (e.kind === "experience") {
    const r = e.ref;
    body = (
      <>
        <header className="detail__head">
          <p className="eyebrow">
            <EntryIcon icon={r.icon} />
            {r.type} · {r.date}
            {r.current && <span className="pill">Current</span>}
          </p>
          <h2 className="detail__title">{r.title}</h2>
          <p className="detail__subtitle">
            {r.org}
            {r.place ? ` — ${r.place}` : ""}
          </p>
          {r.badge && <CompletionBadge label={r.badge} />}
        </header>
        <div className="detail__prose">
          <p>{r.description}</p>
        </div>
        {r.certificate && (
          <CertificateBlock certificate={r.certificate} onView={() => onViewCertificate?.(id)} />
        )}
        {r.relation && (
          <section className="detail__related">
            <h3>Related project</h3>
            <p className="detail__relation">{r.relation.summary}</p>
            <button type="button" className="btn btn--solid" onClick={() => onNavigate(r.relation.projectId)}>
              {r.relation.action} <LuArrowUpRight aria-hidden="true" />
            </button>
          </section>
        )}
        {!r.relation && r.projectIds?.length > 0 && (
          <section className="detail__related">
            <h3>Related project{r.projectIds.length > 1 ? "s" : ""}</h3>
            <ul className="tag-list tag-list--buttons">
              {r.projectIds.map((pid) => (
                <li key={pid}>
                  <button type="button" onClick={() => onNavigate(pid)}>
                    {entities[pid].label} <LuArrowUpRight aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
        {r.techIds.length > 0 && (
          <section className="detail__related">
            <h3>Technologies</h3>
            <ul className="tag-list tag-list--buttons">
              {r.techIds.map((t) => (
                <li key={t}>
                  <button type="button" onClick={() => onShowInGraph(t)} data-accent={entities[t].accent}>
                    <i aria-hidden="true" />
                    {entities[t].label}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </>
    );
  } else {
    const r = e.ref;
    const related = r.projectIds.map((pid) => projects.find((p) => p.id === pid));
    body = (
      <>
        <header className="detail__head">
          <p className="eyebrow">
            {r.featured ? `Featured achievement · ${r.team}` : r.badge}
            {[r.date, r.place].filter(Boolean).length > 0 && ` · ${[r.date, r.place].filter(Boolean).join(" · ")}`}
          </p>
          <h2 className="detail__title">{r.title}</h2>
          {r.badges && <BadgePills badges={r.badges} />}
        </header>
        <div className="detail__prose">
          <p>{r.description}</p>
        </div>
        {r.journey && (
          <section className="detail__related">
            <h3>The journey</h3>
            <JourneyList steps={r.journey} />
          </section>
        )}
        {related.length > 0 && (
          <section className="detail__related">
            <h3>{r.featured ? "Built here" : `Related project${related.length > 1 ? "s" : ""}`}</h3>
            <ul className="tag-list tag-list--buttons">
              {related.map((p) => (
                <li key={p.id}>
                  <button type="button" onClick={() => onNavigate(p.id)}>
                    {p.title} <LuArrowUpRight aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </>
    );
  }

  return (
    <div className="detail">
      <header className="detail__bar">
        <button type="button" className="detail__back" onClick={onClose} autoFocus>
          <LuArrowLeft aria-hidden="true" /> {backLabel}
        </button>
        <button type="button" className="detail__show" onClick={() => onShowInGraph(id)}>
          <LuNetwork aria-hidden="true" /> Show in universe
        </button>
      </header>
      <div className="detail__scroll">
        <motion.article className="detail__article detail__article--narrow" key={id} {...rise}>
          {body}
        </motion.article>
      </div>
    </div>
  );
}
