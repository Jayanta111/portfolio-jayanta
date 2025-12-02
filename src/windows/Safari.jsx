import React from "react";
import WindowWrapper from "../hoc/WindowWrapper.jsx";
import {
  ChevronLeft,
  ChevronRight,
  PanelLeft,
  RefreshCw,
  Lock,
  Search,
  Share,
  Plus,
  Copy,
} from "lucide-react";

import { blogPost } from "../constants/index.js";

function Safari() {
  return (
    <div
      className={`flex flex-col border border-gray-700 shadow-2xl bg-[#1c1c1e] text-white overflow-hidden 
        w-full h-full
      `}
    >
      {/* Top Browser Bar */}
      <div className="flex items-center px-4 py-2 bg-[#2c2c2e] border-b border-gray-700">
        <div className="flex gap-2">
          <button className="p-1 rounded-lg bg-[#3a3a3c] hover:bg-[#4a4a4c] cursor-pointer">
            <ChevronLeft size={18} />
          </button>
          <button className="p-1 rounded-lg bg-[#3a3a3c] hover:bg-[#4a4a4c] cursor-pointer">
            <ChevronRight size={18} />
          </button>
          <button className="p-1 rounded-lg bg-[#3a3a3c] hover:bg-[#4a4a4c] cursor-pointer">
            <RefreshCw size={18} />
          </button>
        </div>

        <div className="flex items-center flex-1 mx-4 px-3 py-1 rounded-xl bg-[#3a3a3c] cursor-pointer">
          <Lock size={14} className="text-green-400 mr-2 cursor-pointer" />
          <Search size={18} className="mr-2 text-gray-300 " />
          <input
            type="text"
            placeholder="Search or enter website name"
            className="bg-transparent w-full text-sm focus:outline-none placeholder-gray-400"
          />
        </div>

        <div className="flex items-center gap-3 cursor-pointer">
          <button className="p-1 rounded-lg bg-[#3a3a3c] hover:bg-[#4a4a4c] cursor-pointer">
            <PanelLeft size={18} />
          </button>
          <button className="p-1 rounded-lg bg-[#3a3a3c] hover:bg-[#4a4a4c] cursor-pointer">
            <Share size={18} />
          </button>
          <button className="p-1 rounded-lg bg-[#3a3a3c] hover:bg-[#4a4a4c] cursor-pointer">
            <Plus size={18} />
          </button>
          <button className="p-1 rounded-lg bg-[#3a3a3c] hover:bg-[#4a4a4c] cursor-pointer">
            <Copy size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-[#1c1c1e] p-4 overflow-auto scroll-auto">
        <h2 className="text-xl font-semibold text-center mb-4">My Videos</h2>
        <p className="text-sm text-center mb-2 text-red-400">Kindly request view full screen mode click green icon</p>

        <div className="flex gap-5 overflow-x-auto max-w-full py-2 px-1">
          {blogPost.map(({ id, title, date, image, link }) => (
            <a
              key={id}
              href={link}
              target="_blank"
              className="shrink-0 w-64 bg-[#2c2c2e] p-3 rounded-xl shadow hover:bg-[#3a3a3c] transition"
            >
              <img
                src={image}
                alt={title}
                className="w-full h-36 object-cover rounded-lg mb-3"
              />

              <h3 className="text-md font-semibold">{title}</h3>
              <p className="text-gray-400 text-xs mt-1">{date}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const SafariWindow = WindowWrapper(Safari, "safari");
export default SafariWindow;
