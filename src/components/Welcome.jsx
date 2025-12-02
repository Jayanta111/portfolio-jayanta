import { useEffect, useRef } from "react";
import gsap from "gsap";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, base: 100 },
  title: { min: 400, max: 900, base: 400 },
};

// Render each character wrapped in <span>
const renderText = (text, className, baseWeight = 200) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

// Hover animation handler (STRONGER + VISIBLE)
const setTextHover = (container, type) => {
  if (!container) return;

  const letters = container.querySelectorAll("span");
  const { min, max } = FONT_WEIGHTS[type];

  const onEnter = (el) => {
    gsap.to(el, {
      duration: 0.35,
      ease: "power3.out",
      scale: 1.18,
      y: -2,
      color: "#ffffff",
      css: { fontVariationSettings: `"wght" ${max}` },
    });
  };

  const onLeave = (el) => {
    gsap.to(el, {
      duration: 0.35,
      ease: "power3.out",
      scale: 1,
      y: 0,
      color: "#f3f4f6",
      css: { fontVariationSettings: `"wght" ${min}` },
    });
  };

  const listeners = [];

  letters.forEach((letter) => {
    const enterHandler = () => onEnter(letter);
    const leaveHandler = () => onLeave(letter);

    letter.addEventListener("mouseenter", enterHandler);
    letter.addEventListener("mouseleave", leaveHandler);

    listeners.push({ letter, enterHandler, leaveHandler });
  });

  return () => {
    listeners.forEach(({ letter, enterHandler, leaveHandler }) => {
      letter.removeEventListener("mouseenter", enterHandler);
      letter.removeEventListener("mouseleave", leaveHandler);
    });
  };
};


function Welcome() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const cleanup1 = setTextHover(titleRef.current, "title");
    const cleanup2 = setTextHover(subtitleRef.current, "subtitle");

    return () => {
      cleanup1 && cleanup1();
      cleanup2 && cleanup2();
    };
  }, []);

  return (
    <section
      id="welcome"
      aria-labelledby="welcome-title"
      className="welcome-section flex flex-col items-center justify-center min-h-screen from-blue-50 to-purple-100 px-4"
    >
      <p
        ref={subtitleRef}
        className="subtitle text-lg md:text-xl font-medium text-gray-300 mb-4"
      >
        {renderText(
          "Hey, I'm Jayanta Chungkrang — Welcome to my",
          "inline-block",
          FONT_WEIGHTS.subtitle.base
        )}
      </p>

      <h1
        id="welcome-title"
        ref={titleRef}
        className="mt-7 text-4xl md:text-6xl font-bold text-gray-100 tracking-tight"
      >
        {renderText(
          "Portfolio",
          "text-6xl italic font-georama",
          FONT_WEIGHTS.title.base
        )}
      </h1>

      <div
        className="small-screen mt-8 bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded shadow-md max-w-md text-gray-800 block md:hidden"
        role="note"
      >
        <p>
          This portfolio is optimized for desktop and tablet screens. Please
          enable desktop mode in your browser for the best experience.
        </p>
      </div>
    </section>
  );
}

export default Welcome;
