import React from "react";
import dayjs from "dayjs";
import image from "../assets/Apple-Logosu.png";
import { navItems, navIcons } from "../constants";
import useWindowStore from "../store/window";

function Navbar() {
  const { openWindow } = useWindowStore();

  return (
    <nav className="flex text-black justify-between items-center bg-white/50 backdrop-blur-3xl p-2 px-5 select-none">
      <div className="flex items-center max-sm:w-full max-sm:justify-center gap-5">
        <img src={image} className="navImage" alt="logo" />
        <p className="text-sm cursor-pointer transition-all">Jayanta's Portfolio</p>

        <ul className="flex items-center gap-5 max-sm:hidden">
          {navItems.map((item) => (
            <li key={item.id} onClick={() => openWindow(item.type)}>
              <p className="text-sm cursor-pointer hover:underline transition-all">
                {item.title}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul className="flex items-center gap-5 max-sm:hidden">
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className="h-5 cursor-pointer" alt={`icon-${id}`} />
            </li>
          ))}
          <time>{dayjs().format("ddd MMM D h:mm A")}</time>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
