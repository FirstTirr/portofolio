"use client";

import { ProjectCard } from "../project-card";
import {
  FolderKanban as Layers,
  Globe,
  Cpu,
  Smartphone,
  Layout,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Project as ProjectModel } from "@prisma/client";

interface ProjectsProps {
  data: ProjectModel[];
}

export const Projects = ({ data }: ProjectsProps) => {
  // If no data, show empty state or return null (or keep initial mock data?)
  // Better to show empty state if DB is empty to avoid confusion.
  if (!data || data.length === 0) {
    return (
      <section id="projects" className="py-32 px-6 bg-background relative">
        <div className="container max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold">Projects</h2>
          <p>No projects found.</p>
        </div>
      </section>
    );
  }

  // Map DB data to ProjectCard format
  const mappedProjects = data.map((p) => ({
    title: p.title,
    description: p.description,
    tech: p.techStack,
    icon: Layout,
    link: p.demoUrl || p.repoUrl || "#",
    imageUrl: p.imageUrl,
    demoUrl: p.demoUrl,
    repoUrl: p.repoUrl,
  }));

  return (
    <section id="projects" className="py-32 px-6 bg-background relative">
      {/* Visual Separator using CSS patterns */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-8 bg-primary/50"></span>
              <span className="text-sm font-news font-medium text-primary uppercase tracking-widest">
                Portfolio
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Selected Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              A collection of projects that I've built.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" className="gap-2">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mappedProjects.map((project, index) => (
            <div key={index} className="col-span-1">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
