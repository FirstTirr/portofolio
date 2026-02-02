"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Briefcase,
  User,
  Code,
  Rocket,
  Layout,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";

interface TechStackItem {
  id: string;
  name: string;
  category: string | null;
  icon?: string | null;
}

interface AboutProps {
  data?: TechStackItem[];
}

export const About = ({ data = [] }: AboutProps) => {
  const [stackIndex, setStackIndex] = useState(0);

  // Group data by category and format for display
  const techStacks = useMemo(() => {
    if (!data || data.length === 0) return [];

    return data.map((item) => {
      let iconNode: React.ReactNode = (
        <Code className="w-8 h-8 text-blue-500" />
      );
      let color = "hover:bg-blue-500/10";

      // Use category or name to determine style
      const lowerCat = (item.category || "").toLowerCase();
      const lowerName = item.name.toLowerCase();

      if (
        lowerCat.includes("framework") ||
        lowerCat.includes("library") ||
        lowerName.includes("react") ||
        lowerName.includes("next") ||
        lowerName.includes("vue")
      ) {
        iconNode = <Layout className="w-8 h-8 text-purple-500" />;
        color = "hover:bg-purple-500/10";
      } else if (
        lowerCat.includes("tool") ||
        lowerCat.includes("devops") ||
        lowerCat.includes("design") ||
        lowerName.includes("figma") ||
        lowerName.includes("git")
      ) {
        iconNode = <Settings className="w-8 h-8 text-orange-500" />;
        color = "hover:bg-orange-500/10";
      }

      // If icon is a URL/image, use it instead
      if (
        item.icon &&
        (item.icon.startsWith("http") || item.icon.startsWith("/"))
      ) {
        iconNode = (
          <img
            src={item.icon}
            alt={item.name}
            className="w-10 h-10 object-contain"
          />
        );
      }

      return {
        icon: iconNode,
        title: item.name,
        color,
      };
    });
  }, [data]);

  useEffect(() => {
    if (techStacks.length === 0) return;

    const interval = setInterval(() => {
      setStackIndex((prev) => (prev + 1) % techStacks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [techStacks.length]);

  return (
    <section id="about" className="py-32 px-6 relative bg-background">
      {/* Visual Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-8 bg-primary/50"></span>
            <span className="text-sm font-news font-medium text-primary uppercase tracking-widest">
              About
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl"
          >
            A glimpse into my world, my journey, and what drives me.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[180px]">
          {/* Bio Card - Large */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 bg-card rounded-3xl p-8 border border-border relative overflow-hidden flex flex-col justify-between group min-h-[300px] md:min-h-0"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />

            <div className="relative z-10">
              <User className="w-10 h-10 mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm a passionate developer from Payakumbuh, Indonesia. I
                specialize in building performant web applications with a focus
                on User Experience and Clean Architecture. My journey started
                with a curiosity for how things work, and now I build the things
                that work.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
              <MapPin className="w-4 h-4" /> Based in Payakumbuh, ID
            </div>
          </motion.div>

          {/* Experience Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 md:row-span-1 bg-card rounded-3xl p-6 border border-border flex flex-col justify-between hover:border-primary/50 transition-colors min-h-[180px]"
          >
            <Briefcase className="w-8 h-8 text-blue-500" />
            <div>
              <div className="text-3xl font-bold">6+</div>
              <div className="text-sm text-muted-foreground">
                month Experience
              </div>
            </div>
          </motion.div>

          {/* Tech Stack Card - Animated */}
          <div className="md:col-span-1 md:row-span-1 bg-card rounded-3xl p-6 border border-border overflow-hidden relative group min-h-[180px]">
            {techStacks.length > 0 ? (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stackIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col justify-center items-center gap-2 z-10 relative"
                  >
                    {techStacks[stackIndex]?.icon}
                    <div className="font-bold text-center">
                      {techStacks[stackIndex]?.title}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Hover Glow Effect based on current stack color */}
                <div
                  className={cn(
                    "absolute inset-0 transition-colors duration-500",
                    techStacks[stackIndex]?.color,
                  )}
                />

                {/* Progress Bar */}
                <motion.div
                  key={`progress-about-${stackIndex}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "linear" }}
                  className="absolute bottom-0 left-0 h-1 bg-primary/20"
                />
              </>
            ) : (
              <div className="h-full flex flex-col justify-center items-center gap-2 z-10 relative opacity-50">
                <Settings className="w-8 h-8" />
                <div className="font-bold text-center">No Tools</div>
              </div>
            )}
          </div>

          {/* Education / Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 md:row-span-1 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-3xl p-6 flex items-center justify-between relative overflow-hidden min-h-[180px]"
          >
            <div className="relative z-10">
              <div className="text-lg font-bold mb-1">
                Student @ SMKN 4 Payakumbuh
              </div>
              <div className="text-primary-foreground/70 text-sm">
                Constantly evolving & learning
              </div>
            </div>
            <Rocket className="w-16 h-16 absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/10 rotate-45" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
