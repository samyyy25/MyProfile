import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LuDownload, LuMaximize, LuMinimize, LuX, LuZoomIn, LuZoomOut } from "react-icons/lu";
import "../certificate.css";

const MIN_ZOOM = 1;
const MAX_ZOOM = 5;
const STEP = 0.5;
const DOUBLE_CLICK_ZOOM = 2.5;
const EASE = [0.22, 1, 0.36, 1];

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
const clamp = (z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(z * 100) / 100));

/**
 * Accessible certificate preview: fit-to-width by default, zoom with the buttons, + / - / 0,
 * Ctrl+wheel or a double-click; drag (mouse) or scroll/swipe (touch) to pan; fullscreen; download.
 * It owns Escape and Tab while open so a detail view underneath never reacts to them.
 */
export default function CertificateViewer({ certificate, reduced, onClose }) {
  const { src, filename, alt, issuer, recipient, program, completion } = certificate;
  const titleId = useId();
  const panelRef = useRef(null);
  const stageRef = useRef(null);
  const zoomRef = useRef(1);
  const drag = useRef(null);

  const [zoom, setZoom] = useState(1);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [fullscreen, setFullscreen] = useState(false);
  const canFullscreen = typeof document !== "undefined" && !!document.fullscreenEnabled;

  useEffect(() => {
    zoomRef.current = zoom;
  });

  /** Zoom while keeping the middle of the visible area fixed. */
  const applyZoom = useCallback((next) => {
    const stage = stageRef.current;
    const z = clamp(next);
    if (!stage) {
      setZoom(z);
      return;
    }
    const cx = (stage.scrollLeft + stage.clientWidth / 2) / (stage.scrollWidth || 1);
    const cy = (stage.scrollTop + stage.clientHeight / 2) / (stage.scrollHeight || 1);
    setZoom(z);
    requestAnimationFrame(() => {
      stage.scrollLeft = cx * stage.scrollWidth - stage.clientWidth / 2;
      stage.scrollTop = cy * stage.scrollHeight - stage.clientHeight / 2;
    });
  }, []);

  const zoomBy = useCallback((delta) => applyZoom(zoomRef.current + delta), [applyZoom]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else panelRef.current?.requestFullscreen?.().catch(() => {});
  }, []);

  // keyboard: this dialog owns Escape / Tab / zoom keys while it is open
  useEffect(() => {
    const opener = document.activeElement;
    panelRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        if (document.fullscreenElement) return; // the browser exits fullscreen first
        event.preventDefault();
        event.stopImmediatePropagation();
        onClose();
        return;
      }
      if (event.key === "Tab") {
        const items = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        const inside = panelRef.current.contains(document.activeElement);
        if (!inside || (event.shiftKey && document.activeElement === first)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
        event.stopImmediatePropagation();
        return;
      }
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "+" || event.key === "=") zoomBy(STEP);
      else if (event.key === "-" || event.key === "_") zoomBy(-STEP);
      else if (event.key === "0") applyZoom(1);
      else return;
      event.preventDefault();
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => {
      window.removeEventListener("keydown", onKeyDown, true);
      if (opener instanceof HTMLElement && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, [onClose, zoomBy, applyZoom]);

  useEffect(() => {
    const onChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      if (document.fullscreenElement) document.exitFullscreen?.();
    };
  }, []);

  // Ctrl/Cmd + wheel (and trackpad pinch) zooms; a plain wheel scrolls as normal
  useEffect(() => {
    const stage = stageRef.current;
    const onWheel = (event) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      zoomBy(event.deltaY < 0 ? 0.25 : -0.25);
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [zoomBy]);

  // mouse drag-to-pan when zoomed (touch uses native scrolling)
  const onPointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || zoomRef.current <= 1) return;
    const stage = stageRef.current;
    drag.current = { x: event.clientX, y: event.clientY, left: stage.scrollLeft, top: stage.scrollTop };
    stage.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event) => {
    if (!drag.current) return;
    const stage = stageRef.current;
    stage.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
    stage.scrollTop = drag.current.top - (event.clientY - drag.current.y);
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  const percent = Math.round(zoom * 100);
  const variants = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.15 } } }
    : { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } };
  const panelVariants = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.94, y: 22 },
        show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      };

  return (
    <motion.div className="cert" variants={variants} initial="hidden" animate="show" exit="hidden">
      <div className="cert__scrim" onClick={onClose} aria-hidden="true" />

      <motion.div
        ref={panelRef}
        className="cert__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        variants={panelVariants}
      >
        <header className="cert__bar">
          <div className="cert__meta">
            <p className="eyebrow">Certificate of completion</p>
            <h2 id={titleId}>{program}</h2>
            <dl className="cert__facts">
              <div>
                <dt>Issuer</dt>
                <dd>{issuer}</dd>
              </div>
              <div>
                <dt>Awarded to</dt>
                <dd>{recipient}</dd>
              </div>
              <div>
                <dt>Completed</dt>
                <dd>{completion}</dd>
              </div>
            </dl>
          </div>
          <button type="button" className="cert__close" onClick={onClose} aria-label="Close certificate">
            <LuX aria-hidden="true" />
          </button>
        </header>

        <div
          ref={stageRef}
          className={`cert__stage${zoom > 1 ? " is-zoomed" : ""}`}
          style={{ "--zoom": zoom }}
          tabIndex={0}
          role="region"
          aria-label="Certificate image. Scroll or drag to pan when zoomed."
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onDoubleClick={() => applyZoom(zoomRef.current > 1 ? 1 : DOUBLE_CLICK_ZOOM)}
        >
          <div className="cert__canvas">
            {status === "loading" && <div className="cert__skeleton" aria-hidden="true" />}
            {status === "error" ? (
              <p className="cert__error" role="alert">
                The certificate image isn't available right now.
              </p>
            ) : (
              <img
                src={src}
                alt={alt}
                draggable="false"
                decoding="async"
                onLoad={() => setStatus("ready")}
                onError={() => setStatus("error")}
                style={status === "ready" ? undefined : { opacity: 0 }}
              />
            )}
          </div>
        </div>

        <div className="cert__tools" role="toolbar" aria-label="Certificate controls">
          <button type="button" onClick={() => zoomBy(-STEP)} disabled={zoom <= MIN_ZOOM} aria-label="Zoom out" title="Zoom out (−)">
            <LuZoomOut aria-hidden="true" />
          </button>
          <button type="button" className="cert__percent" onClick={() => applyZoom(1)} aria-label={`Zoom ${percent} percent. Reset to fit`} title="Reset to fit (0)">
            {percent}%
          </button>
          <button type="button" onClick={() => zoomBy(STEP)} disabled={zoom >= MAX_ZOOM} aria-label="Zoom in" title="Zoom in (+)">
            <LuZoomIn aria-hidden="true" />
          </button>
          <span className="cert__sep" aria-hidden="true" />
          {canFullscreen && (
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={fullscreen ? "Exit fullscreen" : "View fullscreen"}
              title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {fullscreen ? <LuMinimize aria-hidden="true" /> : <LuMaximize aria-hidden="true" />}
            </button>
          )}
          <a
            className="cert__download"
            href={status === "error" ? undefined : src}
            download={filename}
            aria-label="Download certificate"
            aria-disabled={status === "error" || undefined}
            title="Download certificate"
          >
            <LuDownload aria-hidden="true" />
            <span>Download</span>
          </a>
        </div>

        <span className="sr-only" aria-live="polite">
          Zoom {percent} percent
        </span>
      </motion.div>
    </motion.div>
  );
}
