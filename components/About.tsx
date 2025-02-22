import React from "react";
import { Montserrat } from "next/font/google";
import { TextReveal } from "./magicui/text-reveal";

const montserrat = Montserrat({
  weight: ["300", "900", "700"],
  subsets: ["latin"],
});

const About = () => {
  return (
    <div
      className="min-w-full min-h-screen flex items-center justify-center -mt-[32rem]"
      id="about"
    >
      <h3 className="font-bold text-3xl -translate-y-10 hidden sm:block p-4">
        keep<span className="text-sky-400"> Scrolling</span>
      </h3>
      <div className={`${montserrat.className}`}>
        <TextReveal text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum sint laudantium quibusdam voluptates delectus obcaecati ullam quisquam earum porro alias quia, ipsa necessitatibus fugit, rem doloremque sunt similique in odio quo corporis maxime. Voluptas molestiae beatae, sapiente voluptate non qui neque ut magni, alias, tenetur saepe molestias aliquid assumenda maxime." />
      </div>
    </div>
  );
};

export default About;
