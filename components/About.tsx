import React from "react";
import { Montserrat } from "next/font/google";
import { MaskContainer } from "./ui/svg-mask-effect";

const montserrat = Montserrat({
  weight: ["300", "900", "700"],
  subsets: ["latin"],
});

const About = () => {
  return (
    <div className="h-[60rem] w-full flex items-center justify-center overflow-hidden -mt-[35rem]">
      <h3 className="font-bold text-3xl -translate-y-10 hidden sm:block">
        Hover <span className="text-sky-400">Your</span> Cursor👉
      </h3>
      <MaskContainer
        revealText={
          <p className="max-w-6xl mx-auto text-slate-800 text-start text-2xl md:text-3xl sm:text-4xl font-bold p-7 md:px-[4rem] sm:px-[6.5rem]">
            Hi! I'm Fathir Adzan Satia, a vocational high school student from
            West Sumatra, Indonesia. I'm currently studying at SMKN 4
            Payakumbuh, majoring in PPLG (Software and Game Development). I'm
            currently developing my skills as a Front End Developer. When I'm
            not coding, you can find me playing games and playing volleyball -
            those are my favorite ways to relax my mind. I love learning and
            learning new things, such as mastering new skills, trying new
            things, and trying something different that helps me adapt in this
            PPLG major. The drive to learn and mastering new things helps me to
            keep up with the development of technology in today's era.
          </p>
        }
        className="h-[57rem] rounded-md"
      >
        Hi! I'm<span className="text-red-500"> Fathir Adzan Satia,</span> a
        vocational high school student from West Sumatra, Indonesia. I'm
        currently studying at
        <span className="text-red-500"> SMKN 4 Payakumbuh,</span> majoring in
        PPLG (Software and Game Development). I'm currently developing my skills
        as a Front End Developer. When I'm not coding, you can find me
        <span className="text-red-500">
          {" "}
          playing games and playing volleyball
        </span>{" "}
        - those are my favorite ways to relax my mind. I love learning and
        learning new things, such as mastering new skills, trying new things,
        and trying something different that helps me adapt in this PPLG major.{" "}
        <span className="text-red-500">
          {" "}
          The drive to learn and mastering new things
        </span>{" "}
        helps me to keep up with the development of technology in today's era.
      </MaskContainer>
    </div>
  );
};

export default About;
