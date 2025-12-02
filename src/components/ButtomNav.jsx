import React, { useRef, useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import gsap from "gsap";
import { useGSAP } from "../lib/useGSAP";
import { dockApps } from "../constants/index";
import useWindowStore from "../store/window";


const ButtomNav = () => {
  const dockRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { openWindow, closeWindow, windows } = useWindowStore();
  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = Array.from(dock.querySelectorAll(".dock-icon"));

    // Initialize tweens for hover
    const tweens = icons.map((icon) =>
      gsap.to(icon, {
        scale: 1,
        paused: true,
        duration: 0.18,
        ease: "power2.out",
      })
    );

    const jumpScale = 1.6; // only hover icon scales

    const onMove = (e) => {
      if (isAnimating) return;

      icons.forEach((icon, index) => {
        const rect = icon.getBoundingClientRect();
        const mouseOver =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        tweens[index].vars.scale = mouseOver ? jumpScale : 1;
        tweens[index].invalidate().restart();
      });
    };

    const reset = () => {
      if (isAnimating) return;
      tweens.forEach((tween) => {
        tween.vars.scale = 1;
        tween.invalidate().restart();
      });
    };

    dock.addEventListener("mousemove", onMove);
    dock.addEventListener("mouseleave", reset);

    return () => {
      dock.removeEventListener("mousemove", onMove);
      dock.removeEventListener("mouseleave", reset);
    };
  }, [isAnimating]);

  const toggleApp = (app, index) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const icon = dockRef.current.querySelectorAll(".dock-icon")[index];

    // Click bounce
    gsap.fromTo(
      icon,
      { scale: 1 },
      {
        scale: 2,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        onComplete: () => setIsAnimating(false),
      }
    );

    if (!app.canOpen) return;
    const window = windows[app.id];
    if (window.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }
    console.log("App Open");
  };

  return (
    <section className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 select-none max-sm:hidden">
      <div
        ref={dockRef}
        className="bg-white/20 backdrop-blur-md rounded-2xl p-1.5 flex items-end gap-1.5"
      >
        {dockApps.map(({ id, name, icon, canOpen }, index) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className={`size-14 3xl:size-20 ${
                !canOpen ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
              }`}
              aria-label={name}
              data-tooltip-id="dock-tip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen || isAnimating}
              onClick={() => toggleApp({ id, name, canOpen }, index)}
            >
              <img
                className="dock-icon object-cover object-center"
                src={icon}
                alt={name}
                loading="lazy"
                style={{ pointerEvents: "none" }}
              />
            </button>
          </div>
        ))}
      </div>

      <Tooltip id="dock-tip" place="top" />
    </section>
  );
};

export default ButtomNav;
