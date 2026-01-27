"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export const SectionHeading = ({
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 mb-8",
        align === "center"
          ? "items-center text-center"
          : "items-start text-left",
        className,
      )}
    >
      <motion.div
        initial={{
          opacity: 0,
          x: align === "center" ? 0 : -20,
          y: align === "center" ? 20 : 0,
        }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2"
      >
        <span className="h-px w-8 bg-primary/50 hidden md:block"></span>
        <span className="text-sm font-medium text-primary uppercase tracking-widest">
          {title}
        </span>
        <span className="h-px w-8 bg-primary/50 hidden md:block"></span>
      </motion.div>

      {subtitle && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold tracking-tight"
        >
          {subtitle}
        </motion.h2>
      )}
    </div>
  );
};
