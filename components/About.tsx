import React from "react";
import { Montserrat } from "next/font/google";
import { MaskContainer } from "./ui/svg-mask-effect";

const montserrat = Montserrat({
  weight: ["300", "900", "700"],
  subsets: ["latin"],
});

const About = () => {
  return (
    <div className="h-[60rem] w-full flex items-center justify-center  overflow-hidden -mt-[35rem]">
      <MaskContainer
        revealText={
          <p className="max-w-4xl mx-auto text-slate-800 text-center  text-4xl font-bold">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi harum provident suscipit enim reiciendis, omnis ab distinctio, aliquid officiis voluptates doloribus? Vero tempore labore id non ut eveniet voluptas maxime?
          </p>
        }
        className="h-[40rem] border rounded-md"
      >
        Lorem, ipsum dolor sit <span className="text-red-500">consectetur adipisicing elit.</span> Animi harum provident suscipit enim reiciendis, omnis ab distinctio, aliquid officiis voluptates doloribus? Vero tempore labore id non ut <span className="text-red-500">eveniet voluptas maxime?</span>.
      </MaskContainer>
    </div>
  );
};

export default About;
