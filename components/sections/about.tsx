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
  Activity,
  History,
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

          {/* Experience / Flight Log Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 md:row-span-1 bg-black text-white rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:border-cyan-500/50 transition-colors min-h-[180px] relative overflow-hidden group"
          >
            {/* Background Grid - Dark Aerospace Theme */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            {/* Moving Flight Path Line */}
            <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
              <motion.path 
                d="M-10,150 Q100,50 300,100 T600,80" 
                fill="none" 
                stroke="cyan" 
                strokeWidth="2" 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            </svg>

            {/* Header Badge */}
            <div className="relative z-10 flex justify-between items-start">
                 <div className="flex flex-col">
                    <span className="text-[9px] text-cyan-400 font-mono tracking-[0.2em] mb-1">ELAPSED_TIME</span>
                    <div className="flex items-center gap-2">
                       <History className="w-5 h-5 text-white" />
                       <span className="text-sm font-bold tracking-widest">MY JOURNEY</span>
                    </div>
                 </div>
                 <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_cyan]" />
            </div>

            {/* Content Data */}
            <div className="relative z-10 mt-auto">
              <div className="flex items-end gap-2 mb-1">
                 <span className="text-5xl font-black font-mono tracking-tighter text-white">06</span>
                 <div className="flex flex-col pb-2">
                    <span className="text-xl font-mono text-cyan-400 leading-none">+</span>
                    <span className="text-[10px] font-mono text-gray-400 uppercase">Months</span>
                 </div>
              </div>
              <div className="w-full h-[2px] bg-white/20 relative overflow-hidden">
                <motion.div 
                    className="absolute top-0 left-0 h-full bg-cyan-500"
                    animate={{ width: ["0%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <div className="flex justify-between mt-2 text-[10px] font-mono text-gray-400">
                <span>ROLE: DEVELOPER</span>
                <span>STATUS: BUILDING</span>
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

          {/* Education / Status - Orbit Simulation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 md:row-span-1 bg-card rounded-3xl p-6 relative overflow-hidden min-h-[180px] group border border-border"
          >
            {/* Simulation Background Layer */}
            <div className="absolute inset-0 bg-[#0a0a0a]">
              {/* Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
              
              {/* Central Star */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-yellow-400 blur-md opacity-80"
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,0,0.5)] z-10" />

              {/* Orbit Rings & Planets */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
                  style={{ width: `${i * 100}px`, height: `${i * 100}px` }}
                >
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                    animate={{ rotate: 360 }}
                    style={{ originX: 0.5, originY: `${i * 50}px` }}
                    transition={{ duration: 5 + i * 3, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              ))}

              {/* Floating Tech Particles */}
               <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full"
                        initial={{ 
                            x: Math.random() * 400 - 200, 
                            y: Math.random() * 200 - 100, 
                            opacity: 0 
                        }}
                        animate={{ 
                            opacity: [0, 1, 0],
                            y: [null, Math.random() * -50] 
                        }}
                        transition={{ 
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                        style={{
                            left: '50%',
                            top: '50%'
                        }}
                    />
                ))}
              </div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-20 h-full flex flex-col justify-between pointer-events-none">
              <div>
                 <div className="flex items-center gap-2 mb-1">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-mono text-green-400 tracking-wider">SYSTEM STATUS: ONLINE</span>
                 </div>
                 <div className="text-lg font-bold text-white tracking-tight">
                    Student @ SMKN 4 Payakumbuh
                 </div>
              </div>
              
              <div className="flex justify-between items-end">
                <div className="text-white/60 text-sm font-mono max-w-[200px]">
                    Simulating... <br/>
                    Target: Aerospace Simulation Engineer
                </div>
                {/* Connect Button/Link */}
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                    <Rocket className="w-4 h-4 text-white rotate-45" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
