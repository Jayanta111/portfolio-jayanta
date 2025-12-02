import { useEffect } from 'react';
import './App.css';

import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

// Register once only
gsap.registerPlugin(Draggable);

// Components
import { Navbar, Welcome, ButtomNav } from './components/index';
import { Safari, Terminal,Resume, Finder,Contact,Image,Videos } from './windows/index.js';

function App() {

  useEffect(() => {
    document.body.style.overflow = "hidden"; 
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden text-white relative">

      {/* Top UI */}
      <Navbar />
      <Welcome />

      {/* Bottom Navigation (fixed to bottom) */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center z-40">
        <ButtomNav />
      </div>

      {/* Windows Layer */}
      <div className="absolute inset-0 pointer-events-none z-50">
        {/* Windows MUST stay on a dedicated layer */}
        <div className="pointer-events-auto">
          <Terminal />
          <Safari/>
          <Resume />
          <Finder />
          <Contact />
          <Image/>
          <Videos/>
        </div>
      </div>
    </div>
  );
}

export default App;
