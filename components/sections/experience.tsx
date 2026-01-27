"use client";

import { motion } from "framer-motion";
import { Experience as ExperienceModel } from "@prisma/client";
import { format } from "date-fns";

interface ExperienceProps {
  data: ExperienceModel[];
}

export const Experience = ({ data }: ExperienceProps) => {
  if (!data || data.length === 0) return null;

  const mappedExperience = data.map((job) => ({
    year: `${format(new Date(job.startDate), "yyyy")} - ${job.endDate ? format(new Date(job.endDate), "yyyy") : "Present"}`,
    role: job.position,
    company: job.company,
    description: job.description,
    skills: [], // Ideally adding skills to Experience model would be better, but currently empty
  }));

  return (
    <section id="experience" className="py-32 px-6 bg-secondary/5 relative">
      {/* Visual Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-8 bg-primary/50"></span>
            <span className="text-sm font-news font-medium text-primary uppercase tracking-widest">
              Experience
            </span>
            <span className="h-px w-8 bg-primary/50"></span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold"
          >
            Career Path
          </motion.h2>
        </div>

        <div className="space-y-8">
          {mappedExperience.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative pl-8 md:pl-0 border-l-2 md:border-l-0 border-border md:border-transparent"
            >
              {/* Desktop Timeline Line (Hidden on mobile) */}
              {/* Using a different layout: Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Year */}
                <div className="md:col-span-3 text-sm font-mono text-muted-foreground pt-1 md:text-right">
                  {job.year}
                </div>

                {/* Content */}
                <div className="md:col-span-9 p-6 rounded-3xl bg-card border border-border group-hover:border-primary/50 transition-all shadow-sm hover:shadow-md">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                    <h3 className="text-xl font-bold">{job.role}</h3>
                    <span className="text-primary font-medium">
                      {job.company}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {job.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 rounded-md bg-secondary text-xs font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
