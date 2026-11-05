import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "../data/portfolioData";

/**
 * Short cinematic entrance (~1.9s, skippable). The graph mounts underneath straight away;
 * `onReveal` fires as the curtain starts to lift so the nodes can bloom, `onDone` unmounts this.
 */
export default function Intro({ onReveal, onDone }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const q = gsap.utils.selector(root);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(q(".intro__ring"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.95, ease: "power2.inOut" }, 0)
      .fromTo(q(".intro__mono"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
      .fromTo(q(".intro__name"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.4)
      .fromTo(q(".intro__line"), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.65)
      .add(onReveal, 1.3)
      .to(q(".intro__center"), { scale: 1.07, duration: 0.6, ease: "power2.inOut" }, 1.3)
      .to(root, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, 1.3)
      .add(onDone, 1.95);

    // Any key or tap fast-forwards to the end.
    const skip = () => tl.timeScale(8);
    window.addEventListener("keydown", skip);
    root.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      root.removeEventListener("pointerdown", skip);
      tl.kill();
    };
  }, [onReveal, onDone]);

  return (
    <div ref={rootRef} className="intro" aria-hidden="true">
      <div className="intro__center">
        <svg className="intro__svg" viewBox="0 0 100 100">
          <circle className="intro__ring" cx="50" cy="50" r="46" pathLength="1" />
        </svg>
        <span className="intro__mono">{profile.initials}</span>
      </div>
      <p className="intro__name">{profile.name}</p>
      <p className="intro__line">An interactive map of my work</p>
    </div>
  );
}
