import React, { useState, useEffect, useRef } from "react";
import WindowWrapper from "../hoc/WindowWrapper.jsx";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { images } from "../constants/index.js";
import Portal from "../components/Portal.jsx";

function Images() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const modalRef = useRef(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const prevImage = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // Keyboard events
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex]);

  // Dragging logic
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
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", endDrag);
    };
  }, [isDragging]);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      {/* IMAGE GRID */}
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto flex-1">
        {images.map((img, index) => (
          <div key={img.id} className="flex flex-col items-center">
            <img
              src={img.src}
              alt={img.title}
              className="w-32 h-32 object-cover rounded-lg cursor-pointer hover:scale-105 transition"
              onClick={() => openModal(index)}
            />
            <p className="mt-2 text-sm text-center truncate">{img.title}</p>
          </div>
        ))}
      </div>

      {/* FULL SCREEN MODAL */}
      {selectedIndex !== null && (
        <Portal>
          <div className="fixed inset-0 z-[9999] flex justify-center items-center"
            style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
          >
            <div
              ref={modalRef}
              className="absolute w-[90vw] h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
              style={{
                top: "5%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {/* DRAG BAR */}
              <div
                className="w-full cursor-move flex justify-between items-center px-4 py-2 bg-gray-100"
                onMouseDown={startDrag}
              >
                <div className="flex space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-black"
                >
                  <X size={22} />
                </button>
              </div>

              {/* IMAGE VIEW AREA */}
              <div className="relative flex-1 flex justify-center items-center bg-black">
                
                <button
                  onClick={prevImage}
                  className="absolute left-4 text-white opacity-80 hover:opacity-100"
                >
                  <ChevronLeft size={48} />
                </button>

                <img
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].title}
                  className="max-h-full max-w-full object-contain"
                />

                <button
                  onClick={nextImage}
                  className="absolute right-4 text-white opacity-80 hover:opacity-100"
                >
                  <ChevronRight size={48} />
                </button>

                {/* TITLE */}
                <p className="absolute bottom-4 text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded-lg">
                  {images[selectedIndex].title}
                </p>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}

export default WindowWrapper(Images, "gallery");
