"use client";

import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { TechStack as TechStackModel } from "@prisma/client";

interface TechStackProps {
  data: TechStackModel[];
}

export const TechStack = ({ data }: TechStackProps) => {
  // Fallback if no data
  if (!data || data.length === 0) {
    return (
      <section id="tech-stack" className="py-20 relative overflow-hidden">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <p>No tech stack data found.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="tech-stack" className="py-20 relative overflow-hidden">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-2 rounded-lg bg-primary/10 text-primary">
              <Settings className="w-6 h-6" />
            </span>
            <h2 className="text-3xl font-bold">Tech Stack</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            A collection of tools and technologies I use most often for game
            prototyping, web development, and AI experimentation, covering
            everything from exploration and building to deployment and
            maintenance.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-secondary/5 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 h-32 flex flex-col items-center justify-center gap-3 group">
                {item.icon ? (
                  <div className="w-10 h-10 relative flex items-center justify-center">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <Settings className="w-8 h-8 text-muted-foreground/50" />
                )}
                <span className="font-medium text-foreground/80 group-hover:text-primary transition-colors text-sm text-center px-2">
                  {item.name}
                </span>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Decorative background Elements */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] -z-10" />
      </div>
    </section>
  );
};
