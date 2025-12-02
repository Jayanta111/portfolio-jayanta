import React, { useRef, useEffect, useState } from "react";
import useWindowStore from "../store/window";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows, closeWindow } = useWindowStore();
    const windowState = windows[windowKey];
    const ref = useRef(null);

    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [dragging, setDragging] = useState(false);
    const [size, setSize] = useState({ width: 600, height: 400 });
    const [fullscreen, setFullscreen] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });

    // Center window on open
    useEffect(() => {
      if (!ref.current) return;
      const { innerWidth, innerHeight } = window;

      setPosition({
        top: innerHeight / 2 - size.height / 2,
        left: innerWidth / 2 - size.width / 2,
      });
    }, [windowState.isOpen]);

    // Drag handlers
    const onMouseDown = (e) => {
      setDragging(true);
      focusWindow(windowKey);
      const rect = ref.current.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseMove = (e) => {
      if (!dragging || fullscreen) return; // can't drag fullscreen
      setPosition({
        top: e.clientY - dragOffset.current.y,
        left: e.clientX - dragOffset.current.x,
      });
    };

    const onMouseUp = () => setDragging(false);

    useEffect(() => {
      if (dragging) {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
      } else {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      }

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };
    }, [dragging, fullscreen]);

    if (!windowState.isOpen) return null;

    // Control buttons
    const handleClose = () => closeWindow(windowKey);
    const handleMinimize = () => setSize({ width: 0, height: 0 }); // can be improved to taskbar
    const handleFullscreen = () => {
      setFullscreen((prev) => !prev);
      if (!fullscreen) {
        setPosition({ top: 0, left: 0 });
        setSize({ width: window.innerWidth, height: window.innerHeight });
      } else {
        setSize({ width: 600, height: 400 });
        setPosition({
          top: window.innerHeight / 2 - 400 / 2,
          left: window.innerWidth / 2 - 600 / 2,
        });
      }
    };

    return (
      <section
        ref={ref}
        style={{
          top: position.top,
          left: position.left,
          width: size.width,
          height: size.height,
          zIndex: windowState.zIndex,
        }}
        className="absolute shadow-lg rounded-xl bg-gray-200 dark:bg-gray-800 border border-gray-300 overflow-hidden cursor-default transition-all duration-200"
      >
        {/* MacOS-like draggable header */}
        <div
          className="flex items-center px-3 py-2 bg-gray-200 dark:bg-gray-800 rounded-t-xl cursor-move select-none justify-between"
          onMouseDown={onMouseDown}
        >
          <div className="flex gap-2">
            <button
              className="w-3 h-3 bg-red-500 rounded-full"
              onClick={handleClose}
            />
            <button
              className="w-3 h-3 bg-yellow-400 rounded-full"
              onClick={handleMinimize}
            />
            <button
              className="w-3 h-3 bg-green-500 rounded-full"
              onClick={handleFullscreen}
            />
          </div>
          <h2 className="ml-4 font-semibold text-gray-800 dark:text-white text-sm">
            {windowKey.charAt(0).toUpperCase() + windowKey.slice(1)}
          </h2>
        </div>

        {/* Window body */}
        <div className="w-full h-full">
          <Component {...props} />
        </div>
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;
  return Wrapped;
};

export default WindowWrapper;
