import React, { useState, useEffect, useRef } from "react";
import WindowWrapper from "../hoc/WindowWrapper.jsx";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { videos } from "../constants/index.js";
import Portal from "../components/Portal.jsx";

function Videos() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [quality, setQuality] = useState("auto");

  const modalRef = useRef(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const openModal = (index) => {
    setQuality("auto");
    setSelectedIndex(index);
  };

  const closeModal = () => setSelectedIndex(null);

  const prevVideo = () => {
    setSelectedIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const nextVideo = () => {
    setSelectedIndex((prev) =>
      prev === videos.length - 1 ? 0 : prev + 1
    );
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") prevVideo();
      if (e.key === "ArrowRight") nextVideo();
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  // Drag logic for modal
  const startDrag = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - modalRef.current.getBoundingClientRect().left,
      y: e.clientY - modalRef.current.getBoundingClientRect().top,
    });
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    modalRef.current.style.left = `${e.clientX - dragOffset.x}px`;
    modalRef.current.style.top = `${e.clientY - dragOffset.y}px`;
  };

  const endDrag = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onDrag);
      window.addEventListener("mouseup", endDrag);
    } else {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", endDrag);
    }
  }, [isDragging]);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      {/* VIDEO GRID */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-auto flex-1">
        {videos.map((vid, index) => (
          <div
            key={vid.id}
            onClick={() => openModal(index)}
            className="cursor-pointer group"
          >
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow hover:shadow-lg transition">
              <img
                src={vid.thumbnail}
                alt={vid.title}
                className="w-full h-full object-cover group-hover:scale-110 transition"
              />

              {/* Play Icon */}
              <div className="absolute inset-0 flex justify-center items-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                <div className="text-white text-4xl font-bold">▶</div>
              </div>
            </div>

            <p className="mt-2 text-center text-gray-800 dark:text-gray-200 text-sm font-medium truncate">
              {vid.title}
            </p>
          </div>
        ))}
      </div>

      {/* GLOBAL MODAL */}
      {selectedIndex !== null && (
        <Portal>
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[9999]">
            <div
              ref={modalRef}
              className="absolute bg-white dark:bg-[#1a1a1a] rounded-xl shadow-2xl w-[80%] max-w-4xl p-4"
              style={{ top: "10%", left: "50%", transform: "translateX(-50%)" }}
            >
              {/* DRAG HEADER */}
              <div
                className="w-full cursor-move flex justify-between items-center mb-3"
                onMouseDown={startDrag}
              >
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>

                <button onClick={closeModal} className="text-gray-600 dark:text-gray-300 hover:text-black">
                  <X size={22} />
                </button>
              </div>

              {/* QUALITY SELECTOR */}
              <div className="flex justify-center mb-3">
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="px-3 py-1 border dark:border-gray-700 rounded-lg bg-white dark:bg-[#222] text-gray-800 dark:text-gray-200"
                >
                  <option value="auto">Auto</option>
                  <option value="1080p">1080p</option>
                  <option value="720p">720p</option>
                  <option value="480p">480p</option>
                  <option value="360p">360p</option>
                </select>
              </div>

              {/* VIDEO PLAYER */}
              <div className="relative">
                <button
                  onClick={prevVideo}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-800 dark:text-gray-200 hover:scale-110"
                >
                  <ChevronLeft size={38} />
                </button>

                <iframe
                  src={`${videos[selectedIndex].url}&quality=${quality}`}
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                  frameBorder="0"
                  className="w-full aspect-video rounded-lg"
                ></iframe>

                <button
                  onClick={nextVideo}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-800 dark:text-gray-200 hover:scale-110"
                >
                  <ChevronRight size={38} />
                </button>
              </div>

              <p className="mt-3 text-center text-gray-900 dark:text-gray-200 text-lg font-semibold">
                {videos[selectedIndex].title}
              </p>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}

export default WindowWrapper(Videos, "videos");
