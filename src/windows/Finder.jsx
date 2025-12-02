import React, { useState } from "react";
import WindowWrapper from "../hoc/WindowWrapper.jsx";
import useLocationStore from "../store/location.js";

import {
  Search,
  Folder,
  Home,
  Star,
  FileText,
  HardDrive,
  ChevronLeft,
  X,
} from "lucide-react";

import { locations } from "../constants/index.js"; // WORK_LOCATION loaded here

const Finder = () => {
  const { activeLocation, setActiveLocation } = useLocationStore();

  // DEFAULT → WORK_LOCATION (Projects)
  const [currentFolder, setCurrentFolder] = useState(locations.work);
  const [folderStack, setFolderStack] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const openFolder = (folder) => {
    setFolderStack((prev) => [...prev, currentFolder]);
    setCurrentFolder(folder);
  };

  const goBack = () => {
    if (folderStack.length === 0) return;
    const previous = folderStack[folderStack.length - 1];
    setFolderStack((prev) => prev.slice(0, -1));
    setCurrentFolder(previous);
  };

  return (
    <div className="flex flex-col border shadow-2xl w-full h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">

      {/* TOP BAR */}
      <div className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 justify-between">
        
        <div className="flex gap-2 items-center">
          <Search size={18} />
          <span className="text-sm text-gray-700 dark:text-gray-300">Search</span>
        </div>

        {activeLocation === "work" && (
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-sm px-2 py-1 bg-gray-300 dark:bg-gray-700 rounded-lg"
          >
            <ChevronLeft size={18} /> Back
          </button>
        )}
      </div>

      {/* LAYOUT */}
      <div className="flex flex-1 min-h-0">

        {/* SIDEBAR */}
        <aside className="w-52 bg-gray-50 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 p-3 flex flex-col gap-4">

          <SidebarSection title="Favorites">
            <SidebarItem icon={<Home size={16} />} label="Home" value="home" />
            <SidebarItem icon={<Star size={16} />} label="Starred" value="starred" />
          </SidebarSection>

          <SidebarSection title="Locations">
            <SidebarItem icon={<HardDrive size={16} />} label="Macintosh HD" value="hd" />

            <SidebarItem
              icon={<Folder size={16} />}
              label="Projects"
              value="work"
              setActiveLocation={(val) => {
                setActiveLocation(val);
                setCurrentFolder(locations.work);
                setFolderStack([]);
              }}
            />

            <SidebarItem
              icon={<Folder size={16} />}
              label="About Me"
              value="about"
            />

            <SidebarItem
              icon={<FileText size={16} />}
              label="Documents"
              value="documents"
            />
          </SidebarSection>
        </aside>

        {/* MAIN CONTENT */}
        <MainContent
          activeLocation={activeLocation}
          currentFolder={currentFolder}
          openFolder={openFolder}
          setSelectedFile={setSelectedFile}
        />
      </div>

      {/* FILE MODAL */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg w-full max-w-lg max-h-[80vh] overflow-y-auto relative">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedFile(null)}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-4">{selectedFile.name}</h2>

            {/* IMAGE */}
            {selectedFile.image && (
              <img
                src={selectedFile.image}
                className="w-full rounded-lg border shadow mb-4"
                alt="preview"
              />
            )}

            {/* DESCRIPTION */}
            <ul className="list-disc list-inside space-y-2">
              {selectedFile.description?.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>

            {/* LIVE LINK */}
            {selectedFile.live && (
              <a
                href={selectedFile.live}
                target="_blank"
                className="block mt-4 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              >
                Live Demo →
              </a>
            )}

            {/* GITHUB LINK */}
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
        </div>
      )}
    </div>
  );
};

/* ---------------- Sidebar Item ---------------- */
const SidebarItem = ({ icon, label, value, setActiveLocation }) => {
  const { activeLocation, setActiveLocation: update } = useLocationStore();
  const active = activeLocation === value;

  return (
    <div
      onClick={() =>
        setActiveLocation ? setActiveLocation(value) : update(value)
      }
      className={`flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer ${
        active
          ? "bg-gray-300 dark:bg-gray-700"
          : "hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
    >
      {icon}
      <span className="text-sm truncate">{label}</span>
    </div>
  );
};

const SidebarSection = ({ title, children }) => (
  <div>
    <p className="text-xs uppercase text-gray-500 dark:text-gray-400 mb-2">
      {title}
    </p>
    <div className="flex flex-col gap-1">{children}</div>
  </div>
);

/* ---------------- Main Content ---------------- */
const MainContent = ({ activeLocation, currentFolder, openFolder, setSelectedFile }) => {
  if (activeLocation === "work") {
    const files = currentFolder.children;

    return (
      <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-auto flex-1">
        {files.map((file) => (
          <div key={file.id} className="flex flex-col items-center">

            <div
              onClick={() =>
                file.kind === "folder" ? openFolder(file) : setSelectedFile(file)
              }
              className="p-4 rounded-xl hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer flex justify-center items-center"
            >
              {file.kind === "folder" ? (
                <Folder size={32} className="text-yellow-400" />
              ) : (
                <img src={file.icon} alt={file.name} className="w-8 h-8" />
              )}
            </div>

            <p className="text-sm mt-2 text-center truncate">{file.name}</p>
          </div>
        ))}
      </div>
    );
  }

  if (activeLocation === "about") {
    const about = locations.about;

    return (
      <div className="p-4 flex justify-center overflow-auto flex-1">
        <div className="bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-2xl text-center">
          {about.icon && (
            <img
              src={about.icon}
              alt={about.name}
              className="w-48 h-48 rounded-full mb-4 object-cover border-2 border-gray-300 dark:border-gray-600"
            />
          )}

          <h2 className="text-3xl font-bold mb-4">{about.name}</h2>

          <ul className="list-disc list-inside space-y-2 text-left text-gray-700 dark:text-gray-300">
            {about.description.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return <p className="p-6 text-gray-700 dark:text-gray-300">Select a folder...</p>;
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
