import React from "react";
import { Montserrat } from "next/font/google";
import TextReveal from "./ui/reveal-teks";

const montserrat = Montserrat({
  weight: ["300", "900", "700"],
  subsets: ["latin"],
});

const About = () => {
  return (
    <div
      className="min-w-full min-h-screen flex items-center justify-center -mt-[26rem]"
      id="about"
    >
      <h3 className="font-bold text-3xl -translate-y-10 hidden sm:block">
        Keep <span className="text-sky-400">Scrolling!👆</span>
      </h3>
      <div className={`${montserrat.className}`}>
      <TextReveal text="Hi! I'm Fathir Adzan Satia, a vocational high school student from West Sumatra, Indonesia. I'm currently studying at SMKN 4 Payakumbuh, majoring in PPLG (Software and Game Development). I'm currently developing my skills as a Front End Developer. When I'm not coding, you can find me playing games and playing volleyball - those are my favorite ways to relax my mind. I love learning and learning new things, such as mastering new skills, trying new things, and trying something different that helps me adapt in this PPLG major. The drive to learn and mastering new things helps me to keep up with the development of technology in today's era." />
      </div>
    </div>
  );
};

export default About;
