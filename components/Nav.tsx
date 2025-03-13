import React from "react";
import { TypingAnimation } from "./magicui/typing-animation";
import ThemeToggle from "@/components/ThemeToggle";
import { TextAnimate } from "./magicui/text-animate";

const Nav: React.FC = () => {
  return (
    <nav>
      <div className="p-1 item-center justify-between flex w-full">
        <a href="#" className="px-0.5 hover:text-blue-500 font-bold">
          <TextAnimate animation="slideLeft" by="character">
            FATHIR ADZAN SATIA
          </TextAnimate>
        </a>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
