"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Folder } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  color?: string; // Optional now
  icon: any;
  link: string;
  imageUrl?: string | null;
  demoUrl?: string | null;
  repoUrl?: string | null;
}

export const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-3xl bg-card border-2 border-border/50 overflow-hidden flex flex-col h-full hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5"
    >
      <div className="absolute inset-0 bg-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Project Image */}
      {project.imageUrl && (
        <div className="relative w-full aspect-video overflow-hidden border-b border-border/50">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay with links */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                className="p-3 bg-white text-black rounded-full hover:bg-primary hover:text-white transition-colors"
                title="Live Demo"
              >
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            )}
            {project.repoUrl && (
              <Link
                href={project.repoUrl}
                target="_blank"
                className="p-3 bg-white text-black rounded-full hover:bg-primary hover:text-white transition-colors"
                title="View Code"
              >
                <Github className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="relative p-8 flex flex-col h-full z-10">
        <div className="flex items-start justify-between mb-6">
          {!project.imageUrl && (
            <div className="p-3 bg-secondary rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <project.icon className="w-6 h-6" />
            </div>
          )}
          {/* Fallback links if no image */}
          {!project.imageUrl && (
            <div className="flex gap-2 ml-auto">
              <Link
                href={project.link}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                title="View Source"
              >
                <Github className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </Link>
              <Link
                href={project.link}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                title="Live Demo"
              >
                <ArrowUpRight className="w-5 h-5 text-muted-foreground hover:text-foreground" />
              </Link>
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6 flex-1 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-transparent bg-secondary/50 px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
