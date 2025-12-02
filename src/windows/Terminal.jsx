import React from "react";
import WindowWrapper from "../hoc/WindowWrapper.jsx";
import { Skills } from "../constants/index.js";

function Terminal() {
  return (
    <div className="flex flex-col w-full h-full bg-[#0c0c0c] border border-gray-700 rounded-xl shadow-2xl overflow-hidden">

      {/* Terminal body */}
      <div className="flex-1 p-5 overflow-auto font-mono text-sm bg-black text-green-400">

        <p className="text-green-300 mb-4">
          <span className="font-bold">@Jayanta_Chungkrang %</span>{" "}
          show tech stack
        </p>

        <div className="space-y-6 cursor-pointer">
          {Object.entries(Skills).map(([category, items]) => (
            <div
              key={category}
              className="border border-gray-700 rounded-lg p-4 bg-[#111] shadow-inner"
            >
              <h3 className="text-yellow-400 font-bold text-lg mb-3 tracking-wide">
                ▶ {category.toUpperCase()}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-2 bg-[#0a0a0a] px-3 py-2 rounded-md border border-gray-700 hover:bg-black hover:border-green-400 transition-all"
                    >
                      <Icon className="text-green-300" fontSize="small" />
                      <span className="text-green-300">{item.title}</span>
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const TerminalWindow = WindowWrapper(Terminal, "terminal");
export default TerminalWindow;
