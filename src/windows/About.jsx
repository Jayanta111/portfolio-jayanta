import React from "react";
import WindowWrapper from "../hoc/WindowWrapper.jsx";
import { educationData, achievementData } from "../constants/index.js";

function About() {
  return (
    <div className="flex flex-col border border-gray-700 shadow-2xl bg-[#1c1c1e] text-white w-full h-full rounded-xl overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center justify-center bg-gray-800 border-b border-gray-700 p-4">
        <h1 className="text-2xl font-semibold">About Me</h1>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 p-6 gap-10 overflow-auto">

        {/* ---------- ABOUT ME ----------- */}
        <section className="flex flex-col items-center text-center gap-4">
          <img
            src="/Profile.jpg"
            alt="Profile"
            className="w-32 h-32 rounded-full border-2 border-gray-700 object-cover"
          />
          <h2 className="text-2xl font-semibold">Jayanta Chungkrang</h2>
          <p className="text-gray-300 max-w-2xl">
            I am a passionate developer who loves building interactive and modern
            web applications. I enjoy working with React, Next.js, MERN stack,
            and Kotlin Multiplatform. Always excited to learn new technologies
            and build real-world projects.
          </p>
        </section>

        {/* ---------- EDUCATION SECTION ----------- */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-l-4 border-blue-500 pl-3">
            My Education
          </h2>

          <div className="flex flex-col gap-6">
            {educationData.map((edu) => (
              <div
                key={edu.id}
                className="flex gap-4 bg-gray-900 p-4 rounded-xl border border-gray-700"
              >
                <img
                  src={edu.image}
                  className="w-20 h-20 rounded-lg object-cover"
                  alt={edu.title}
                />
                <div>
                  <h3 className="text-lg font-semibold">{edu.title}</h3>
                  <p className="text-gray-300">{edu.institution}</p>
                  <p className="text-gray-400 text-sm">{edu.year}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- ACHIEVEMENTS SECTION ----------- */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-l-4 border-yellow-500 pl-3">
            Achievements
          </h2>

         <div className="grid md:grid-cols-2 gap-6 w-full">
  {achievementData.map((item) => (
    <div
      key={item.id}
      className="group bg-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      {/* Image */}
      <div className="w-full flex justify-center mb-4">
        <img
          src={item.image}
          className="w-24 h-24 rounded-xl object-cover border border-gray-700 group-hover:scale-105 transition-transform duration-300"
          alt={item.title}
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed">
        {item.description}
      </p>
    </div>
  ))}
</div>

        </section>

      </div>
    </div>
  );
}

const AboutWindow = WindowWrapper(About, "about");
export default AboutWindow;
