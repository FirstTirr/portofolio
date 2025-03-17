import React from "react";
import { motion } from "motion/react";
import { LinkPreview } from "@/components/ui/link-preview";
import { TextAnimate } from "@/components/magicui/text-animate";
import { div } from "framer-motion/client";

const Project = () => {
  const sections = [
    {
      name: "Selamat wisuda",
      category: "Front-End Project",
      techStack: ["HTML", "JavaScript", "Tailwindcss"],
      link: "https://ucapan-wisuda-mkqgivblh-firsttirrs-projects.vercel.app/",
      img: "/project-1.png",
    },
  ];

  return (
    <div className="min-w-full min-h-screen flex flex-col">
      <TextAnimate className="font-sans text-4xl absolute mt-24  font-bold p-8">
        Featured Work
      </TextAnimate>
      <div className="justify-center items-center mt-48 p-8 rounded-lg">
        {sections.map((section, index) => (
          <div
            className="border-t border-gray-200 py-8 first:border-t-0 group"
            key={index}
          >
            <LinkPreview url={section.link} imageSrc={section.img} isStatic>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h2 className="text-4xl font-normal group-hover:text-gray-600 transition-colors pr-8 dark:text-white">
                    {section.name}
                  </h2>
                  <div className="flex gap-2 flex-wrap">
                    {section.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm">{section.category}</span>
                </div>
              </div>
            </LinkPreview>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
