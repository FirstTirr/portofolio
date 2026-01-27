"use client";

import { motion } from "framer-motion";
import {
  Code,
  Layout,
  Settings,
  Database,
  Terminal,
  Globe,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { TechStack as TechStackModel } from "@prisma/client";

interface TechStackProps {
  data: TechStackModel[];
}

export const TechStack = ({ data }: TechStackProps) => {
  if (data.length === 0) {
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
      <div className="container max-w-6xl mx-auto px-6">
        <SectionHeading
          title="Tech Stack"
          subtitle="My Technical Arsenal"
          description="A collection of tools and technologies I use most often for game prototyping, web development, and AI experimentation, covering everything from exploration and building to deployment and maintenance."
          align="center"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-12">
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="flex flex-col items-center justify-center p-6 h-32 bg-secondary/5 border-border/50 hover:bg-secondary/10 hover:border-primary/50 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-primary/5">
                {item.icon ? (
                  <div className="mb-3 relative w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>
                ) : (
                  <div className="mb-3 p-2 rounded-lg bg-background/50 text-muted-foreground group-hover:text-primary transition-colors">
                    <Code className="w-8 h-8" />
                  </div>
                )}
                <span className="text-sm font-medium text-center text-foreground/80 group-hover:text-foreground transition-colors">
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

function getIconForCategory(category: string) {
  const lower = category.toLowerCase();
  if (lower.includes("frontend") || lower.includes("core"))
    return <Code className="w-5 h-5 text-blue-400" />;
  if (lower.includes("framework") || lower.includes("library"))
    return <Layout className="w-5 h-5 text-purple-400" />;
  if (lower.includes("backend") || lower.includes("database"))
    return <Database className="w-5 h-5 text-green-400" />;
  if (lower.includes("tool") || lower.includes("devops"))
    return <Settings className="w-5 h-5 text-orange-400" />;
  return <Terminal className="w-5 h-5 text-gray-400" />;
}
