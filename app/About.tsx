import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["300", "400", "700"],
  subsets: ['latin']
});

const About = () => {
  return (
    <div
    >
      <h3>
        About
      </h3>
      <div>
        <p>test</p>
      </div>
    </div>
  );
};

export default About;