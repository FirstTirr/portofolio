"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Code,
  Layout,
  Settings,
  Database,
  Terminal,
  Cpu,
  Zap,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MouseEvent } from "react";

interface TechStackModel {
  id: string;
  name: string;
  icon: string | null;
  category: string | null;
}

interface TechStackProps {
  data: TechStackModel[];
}

function TechCard({ item, index }: { item: TechStackModel; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      viewport={{ once: true }}
      className="group relative border border-border/50 bg-card/50 dark:bg-black/50 dark:border-white/10 overflow-hidden rounded-xl"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(6, 182, 212, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full flex flex-col items-center justify-center p-6 gap-4 z-10 transition-colors">
        {/* Corner Accents */}
        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <div className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_cyan]" />
        </div>
        <div className="absolute bottom-0 left-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[8px] font-mono text-cyan-500">SYS_READY</span>
        </div>

        {/* Icon Container */}
        <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-secondary/20 border border-border dark:bg-white/5 dark:border-white/10 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all duration-300">
             {item.icon ? (
                  <img
                      src={item.icon}
                      alt={item.name}
                      className="w-10 h-10 object-contain drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  />
             ) : (
                 <Cpu className="w-8 h-8 text-cyan-500" />
             )}
             
             {/* Rotating Ring */}
             <div className="absolute inset-0 border border-dashed border-cyan-500/30 rounded-2xl animate-[spin_10s_linear_infinite] opacity-0 group-hover:opacity-100" />
        </div>

        <div className="text-center z-20">
          <h3 className="text-sm font-bold font-mono tracking-wider text-foreground dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            {item.name}
          </h3>
          <p className="text-[10px] text-muted-foreground font-mono tracking-widest mt-1 group-hover:text-cyan-500/70 uppercase">
            {item.category || "CORE_SYSTEM"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export const TechStack = ({ data }: TechStackProps) => {
  if (data.length === 0) {
    return (
      <section id="tech-stack" className="py-20 relative overflow-hidden bg-black text-white">
        <div className="container max-w-4xl mx-auto px-6 text-center">
            <p className="font-mono text-cyan-500">SYSTEM OFFLINE: NO DATA FOUND</p>
        </div>
      </section>
    );
  }

  return (
    <section id="tech-stack" className="py-32 relative overflow-hidden bg-background">
       {/* Background Grid - Adaptive Theme */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
       
       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-900/20 dark:via-cyan-900 to-transparent" />
       <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-900/20 dark:via-cyan-900 to-transparent" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 flex flex-col items-center">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="flex items-center gap-2 mb-4"
           >
              <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-500" />
              <span className="text-sm font-mono text-cyan-600 dark:text-cyan-500 tracking-[0.3em] uppercase">System Configuration</span>
              <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-500" />
           </motion.div>
           
           <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 dark:from-white dark:to-white/50 mb-6 text-center">
             Operational Arsenal
           </h2>
           
           <p className="text-muted-foreground/80 dark:text-muted-foreground/60 max-w-2xl text-center leading-relaxed">
             Primary tools and technologies deployed for mission-critical applications. 
             Optimized for performance, scalability, and user experience.
           </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data.map((item, index) => (
            <TechCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

