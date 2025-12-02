import { useEffect } from "react";
import "./App.css";

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

// Register GSAP Draggable
gsap.registerPlugin(Draggable);

// Components
import { Navbar, Welcome, ButtomNav, Home } from "./components/index";
import {
  Safari,
  Terminal,
  Resume,
  Finder,
  Contact,
  Image,
  Videos,
  About,
} from "./windows/index.js";

function App() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden text-white relative">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10">
        <Welcome />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center z-20">

        <ButtomNav />
      </div>

      {/* Windows Layer (Draggable) */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Terminal />
          <Safari />
          <Resume />
          <Finder />
          <Contact />
          <Image />
          <Videos />
             <Home/>
              <About/>
        </div>
      </div>
    </div>
  );
}

export default App;
