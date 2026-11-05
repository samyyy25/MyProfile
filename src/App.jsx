import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { profile } from "./data/portfolioData";
import { entities } from "./graph/buildGraph";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useTheme } from "./hooks/useTheme";
import AmbientBackground from "./components/AmbientBackground";
import DetailOverlay from "./components/DetailOverlay";
import ErrorBoundary from "./components/ErrorBoundary";
import TopBar from "./components/TopBar";
import ViewToggle from "./components/ViewToggle";
import WelcomeNote from "./components/WelcomeNote";

// Heavy or conditional views are split out of the entry chunk.
const PortfolioCanvas = lazy(() => import("./components/PortfolioCanvas"));
const ExplorerView = lazy(() => import("./components/ExplorerView"));
const ProjectDetail = lazy(() => import("./components/ProjectDetail"));
const EntryDetail = lazy(() => import("./components/EntryDetail"));
const Intro = lazy(() => import("./components/Intro"));
const CertificateViewer = lazy(() => import("./components/CertificateViewer"));

const COMPACT_QUERY = "(max-width: 760px)";
const WELCOME_KEY = "welcome-dismissed";

function readDismissed() {
  try {
    return sessionStorage.getItem(WELCOME_KEY) === "1";
  } catch {
    return false;
  }
}

export default function App() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const compact = useMediaQuery(COMPACT_QUERY);
  const { theme, toggle: toggleTheme } = useTheme();

  // Phones open on the grid explorer; everything else opens on the graph.
  const [view, setView] = useState(() => (window.matchMedia(COMPACT_QUERY).matches ? "grid" : "graph"));
  const [focus, setFocus] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null); // { id, origin }
  const [certificate, setCertificate] = useState(null); // id of the entry whose certificate is open
  const [resetToken, setResetToken] = useState(0);

  // The cinematic intro only plays for the graph, and never under reduced motion.
  const [introActive, setIntroActive] = useState(
    () => view === "graph" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [revealed, setRevealed] = useState(!introActive);
  const [welcomeDismissed, setWelcomeDismissed] = useState(readDismissed);

  const onReveal = useCallback(() => setRevealed(true), []);
  const onIntroDone = useCallback(() => setIntroActive(false), []);

  // Fail-safe: if the intro chunk never arrives, don't leave the graph hidden behind a curtain.
  useEffect(() => {
    if (!introActive) return undefined;
    const timer = window.setTimeout(() => {
      setRevealed(true);
      setIntroActive(false);
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [introActive]);

  const dismissWelcome = useCallback(() => {
    setWelcomeDismissed(true);
    try {
      sessionStorage.setItem(WELCOME_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const handleFocusChange = useCallback((id) => {
    setFocus(id);
    setSelectedId(null);
  }, []);

  const reset = useCallback(() => {
    setFocus(null);
    setSelectedId(null);
  }, []);

  const goHome = useCallback(() => {
    reset();
    setResetToken((t) => t + 1);
  }, [reset]);

  const openDetail = useCallback((id, rect) => {
    const origin = rect
      ? { t: rect.top, r: window.innerWidth - rect.right, b: window.innerHeight - rect.bottom, l: rect.left }
      : null;
    setDetail({ id, origin });
  }, []);

  const closeDetail = useCallback(() => setDetail(null), []);
  const openCertificate = useCallback((id) => setCertificate(id), []);
  const closeCertificate = useCallback(() => setCertificate(null), []);
  const navigateDetail = useCallback((id) => setDetail((d) => (d ? { ...d, id } : d)), []);

  // From a detail view (or the explorer), jump into the graph with a node selected.
  const showInGraph = useCallback((id) => {
    setDetail(null);
    setFocus(null);
    setView("graph");
    setSelectedId(id);
  }, []);

  const handleContact = useCallback(() => {
    if (view === "graph") setSelectedId("contact");
    openDetail("contact", null);
  }, [view, openDetail]);

  const detailEntity = detail ? entities[detail.id] : null;
  const certificateEntity = certificate ? entities[certificate] : null;
  const DetailView = detailEntity?.kind === "project" ? ProjectDetail : EntryDetail;
  const detailLabel = detailEntity
    ? detailEntity.kind === "me"
      ? `About ${profile.name}`
      : detailEntity.label
    : "";

  return (
    <>
      <a
        className="skip-link"
        href="#explorer"
        onClick={(event) => {
          event.preventDefault();
          setView("grid");
        }}
      >
        Skip the graph — switch to the list view
      </a>

      <AmbientBackground theme={theme} reduced={reduced} />

      <div className="stage" data-view={view} inert={detail || certificate ? true : undefined}>
        <TopBar
          theme={theme}
          onToggleTheme={toggleTheme}
          focus={focus}
          onFocusChange={handleFocusChange}
          onContact={handleContact}
          onHome={goHome}
        />

        <ErrorBoundary>
        <Suspense fallback={null}>
          {view === "graph" ? (
            <>
              <h1 className="sr-only">
                {profile.name} — {profile.role}
              </h1>
              <PortfolioCanvas
                selectedId={selectedId}
                onSelect={setSelectedId}
                focus={focus}
                onOpenDetail={openDetail}
                onReset={reset}
                resetToken={resetToken}
                ready={revealed}
                theme={theme}
                compact={compact}
                reduced={reduced}
                onInteract={dismissWelcome}
                onViewCertificate={openCertificate}
              />
            </>
          ) : (
            <ExplorerView
              focus={focus}
              onFocusChange={handleFocusChange}
              onOpenDetail={openDetail}
              onShowGraph={() => setView("graph")}
              onViewCertificate={openCertificate}
              reduced={reduced}
            />
          )}
        </Suspense>
        </ErrorBoundary>

        <WelcomeNote visible={view === "graph" && revealed && !welcomeDismissed} onDismiss={dismissWelcome} />

        <div className="bottom-left">
          <ViewToggle view={view} onChange={setView} />
        </div>
      </div>

      <AnimatePresence>
        {detail && (
          <DetailOverlay
            key="detail"
            label={detailLabel}
            origin={detail.origin}
            reduced={reduced}
            inert={certificate ? true : undefined}
            onClose={closeDetail}
          >
            <ErrorBoundary>
              <Suspense fallback={null}>
                <DetailView
                  id={detail.id}
                  backLabel={view === "graph" ? "Back to the universe" : "Back"}
                  onClose={closeDetail}
                  onNavigate={navigateDetail}
                  onShowInGraph={showInGraph}
                  onViewCertificate={openCertificate}
                  reduced={reduced}
                />
              </Suspense>
            </ErrorBoundary>
          </DetailOverlay>
        )}
      </AnimatePresence>

      <Suspense fallback={null}>
        <AnimatePresence>
          {certificateEntity && (
            <CertificateViewer
              key="certificate"
              certificate={certificateEntity.ref.certificate}
              reduced={reduced}
              onClose={closeCertificate}
            />
          )}
        </AnimatePresence>
      </Suspense>

      {introActive && (
        <Suspense fallback={<div className="intro" aria-hidden="true" />}>
          <Intro onReveal={onReveal} onDone={onIntroDone} />
        </Suspense>
      )}
    </>
  );
}
