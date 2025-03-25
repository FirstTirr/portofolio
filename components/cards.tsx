// Certificates.jsx
import React from "react";
import { Card } from "./Card";
import { TextAnimate } from "@/components/magicui/text-animate";

// Certificate data
export const certificates = [
  {
    title: "Sertifikat Python Fundamental",
    desc: "Menguasai Dasar-Dasar Pemrograman Python.",
    image: "/py.svg",
  },
  {
    title: "Sertifikat Mikrotik",
    desc: "Mempelajari Dasar-Dasar Mikrotik.",
    image: "/Mikrotik.jpg",
  },
  {
    title: "Sertifikat Network.",
    desc: "Menguasai Dasar-Dasar Jaringan.",
    image: "/network.svg",
  },
  {
    title: "Sertifikat Virtual Machine",
    desc: "Mempelajari Dasar-Dasar Virtual Machine.",
    image: "/virtualMachine.svg",
  },
  {
    title: "Sertifikat Dart Fundamental",
    desc: "Menguasai Dasar-Dasar Pemrograman Dart.",
    image: "/dartFundamental.jpg",
  }
];

// Example usage in a component
const Cards = () => {
  return (
    <div className="flex flex-col text-center text-4xl">
      <TextAnimate className="font-sans font-bold">My Achievment</TextAnimate>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6`}
      >
        {certificates.map((cert, index) => (
          <Card
            key={index}
            title={cert.title}
            desc={cert.desc}
            image={cert.image}
          />
        ))}
      </div>
    </div>
  );
};

export { Card };
export default Cards;