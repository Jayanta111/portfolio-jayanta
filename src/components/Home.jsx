import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { locations } from "../constants/index.js";

const projectFolders = locations.work?.children ?? [];

const RESUME_FILE = {
  id: "resume",
  name: "Jayanta_Chungkrang_Resume.pdf",
  icon: "/pdf-icon.png",
  kind: "file",
  filetype: "pdf",
  path: "/Jayanta_Chungkrang_Resume.pdf",
  description: ["My latest resume in PDF format."],
  image: "/resume-preview.png",
  github: "https://github.com/yourusername/resume-repo",
  live: "https://yourwebsite.com/resume-preview",
};

function Home() {
  const [windows, setWindows] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const rootFolder = { name: "Projects", children: [...projectFolders, RESUME_FILE] };

  const openFolder = (folder) => {
    const id = `${folder.id}-${Date.now()}`;
    setWindows((prev) => [...prev, { ...folder, windowId: id }]);
  };

  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.windowId !== id));
  };

  const openFile = (file) => {
    if (file.filetype === "pdf" && file.path) {
      window.open(file.path, "_blank");
    } else {
      setSelectedFile(file);
    }
  };

  return (
    <section className="p-6 flex flex-col items-center w-96 h-2/3 mt-20">

      {/* Root Folder Grid - FIXED TO 2 COLUMNS */}
      <div className="grid grid-cols-3 gap-6 w-full max-w-7xl mt-10">
        {rootFolder.children.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
            onClick={() => (item.kind === "folder" ? openFolder(item) : openFile(item))}
          >
            <img
              src={item.kind === "folder" ? "/Text.png" : item.icon || "/pdf-icon.png"}
              className="w-16 h-16 mb-2 object-contain"
              alt={item.name}
            />
            <p className="text-sm text-center truncate max-w-[80px]">{item.name}</p>
          </div>
        ))}
      </div>

      {/* Draggable Folder Windows */}
      {windows.map((folder) => (
        <motion.div
          key={folder.windowId}
          drag
          dragConstraints={{
            left: 0,
            top: 0,
            right: window.innerWidth - 320,
            bottom: window.innerHeight - 200,
          }}
          className="fixed top-20 left-20 w-80 z-50 bg-gray-100 dark:bg-gray-900 shadow-2xl rounded-lg overflow-hidden"
        >
          {/* MacOS-style Header */}
          <div className="flex items-center justify-between p-2 cursor-move bg-gray-300 dark:bg-gray-700">
            <div className="flex gap-2">
              <span
                className="w-3 h-3 rounded-full bg-red-500 hover:opacity-80"
                onClick={() => closeWindow(folder.windowId)}
              />
              <span className="w-3 h-3 rounded-full bg-yellow-400 hover:opacity-80" />
              <span className="w-3 h-3 rounded-full bg-green-500 hover:opacity-80" />
            </div>
            <h2 className="font-semibold text-sm">{folder.name}</h2>
            <div className="w-6" />
          </div>

          {/* Folder Content */}
          <div className="grid grid-cols-2 gap-4 p-3">
            {folder.children?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                onClick={() => (item.kind === "folder" ? openFolder(item) : openFile(item))}
              >
                <img
                  src={item.kind === "folder" ? "/Text.png" : item.icon || "/pdf-icon.png"}
                  className="w-12 h-12 mb-2"
                  alt={item.name}
                />
                <p className="text-sm text-center truncate max-w-[60px]">{item.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* File Preview Modal */}
      {selectedFile && (
        <motion.div
          drag
          dragConstraints={{
            left: 0,
            top: 0,
            right: window.innerWidth - 400,
            bottom: window.innerHeight - 300,
          }}
          className="fixed inset-0 flex justify-center items-center z-50 p-4"
        >
          <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl">

            <div className="flex justify-between items-center cursor-move mb-4">
              <h2 className="text-xl font-semibold">{selectedFile.name}</h2>
              <button onClick={() => setSelectedFile(null)}>
                <X size={20} />
              </button>
            </div>

            {selectedFile.image && (
              <img
                src={selectedFile.image}
                alt={selectedFile.name}
                className="w-full rounded-lg mb-4"
              />
            )}

            {selectedFile.description && (
              <ul className="list-disc list-inside space-y-2">
                {selectedFile.description.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            )}

            {selectedFile.live && (
              <a
                href={selectedFile.live}
                target="_blank"
                className="block mt-4 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              >
                Live Demo →
              </a>
            )}

            {selectedFile.github && (
              <a
                href={selectedFile.github}
                target="_blank"
                className="block mt-2 text-center bg-gray-800 hover:bg-black text-white py-2 rounded-lg"
              >
                GitHub →
              </a>
            )}

          </div>
        </motion.div>
      )}
    </section>
  );
}

export default Home;
