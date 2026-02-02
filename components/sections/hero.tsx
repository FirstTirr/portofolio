"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Download,
  Code,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const [textIndex, setTextIndex] = useState(0);
  const roles = ["Frontend Developer", "UI/UX Designer", "Problem Solver"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden bg-background text-foreground selecting-none selection:bg-primary/20">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0  bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

      <div className="container max-w-6xl mx-auto z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <motion.div
          style={{ y: y1 }}
          className="flex-1 flex flex-col items-start text-left space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-xs font-mono text-muted-foreground uppercase tracking-wider"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Frontend Developer
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]"
            >
              I'M <span className="text-muted-foreground/50">FATHIR</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
                ADZAN SATIA
              </span>
              <span className="text-primary animate-pulse ml-2">_</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="h-8 overflow-hidden"
            >
              <motion.p
                key={textIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="text-xl md:text-2xl text-muted-foreground font-light"
              >
                {roles[textIndex]}
              </motion.p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-md"
          >
            I craft digital experiences with a focus on motion, aesthetics, and
            performance. Turning ideas into functional, beautiful realities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4"
          >
            <Link href="#projects">
              <Button
                size="lg"
                className="rounded-full text-base font-medium px-8 h-12"
              >
                View Work
              </Button>
            </Link>
            <Link href="https://wa.me/+6281266591758">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full text-base font-medium px-8 h-12"
              >
                Contact Me
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-6 text-muted-foreground"
          >
            {/* Social Icons */}
            <Link
              href="https://github.com/FirstTirr"
              className="hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              <Mail className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Visual / Abstract Element - Updated to "More Useful" Widget style */}
        <motion.div
          style={{ y: y2 }}
          className="flex-1 w-full max-w-[420px] aspect-[4/5] relative hidden md:block" // Reduced max-width slightly for better proportions
        >
          {/* Back Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-purple-500/10 to-transparent rounded-full blur-[80px] animate-pulse" />

          <div className="relative w-full h-full border border-white/5 rounded-3xl overflow-hidden bg-zinc-900/50 backdrop-blur-md grid grid-cols-2 grid-rows-6 p-3 gap-3 shadow-2xl">
            {/* Photo Area (Green) - Dominant & "Square-ish" */}
            <div className="col-span-2 row-span-4 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl overflow-hidden relative group border border-white/5 shadow-inner">
              {/* Placeholder for User Image - Use <Image /> here */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground gap-4 group-hover:scale-105 transition-transform duration-700">
                <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center border border-white/5 shadow-lg">
                  <span className="text-4xl">👋</span>
                </div>
                <div className="text-center">
                  <span className="text-sm font-medium text-zinc-400">
                    <img src="./portfolio.jpeg" alt="" />
                  </span>
                  <span className="block text-[10px] opacity-40 mt-1">
                    1080x1080px Recommended
                  </span>
                </div>
              </div>

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="block text-white font-bold text-xl tracking-tight">
                    Fathir Adzan Satia
                  </span>
                </div>
              </div>
            </div>

            {/* Download CV (Red) - Modernized */}
            <div className="col-span-1 row-span-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-primary hover:text-primary-foreground text-zinc-900 dark:text-zinc-100 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer group border border-white/5 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform" />

              <div className="flex justify-between items-start relative z-10">
                <div className="p-2 bg-background/10 rounded-full backdrop-blur-sm">
                  <Download className="w-5 h-5" />
                </div>
              </div>
              <div className="relative z-10">
                <span className="block text-2xl font-bold tracking-tight">
                  CV
                </span>
                <span className="text-[10px] opacity-70 uppercase tracking-widest font-medium group-hover:opacity-100">
                  Resume
                </span>
              </div>
            </div>

            {/* Github (Blue) - Modernized */}
            <Link
              href="https://github.com/FirstTirr"
              target="_blank"
              className="col-span-1 row-span-2 bg-black/40 hover:bg-zinc-900 rounded-2xl p-5 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150"></div>

              <div className="flex justify-between items-start relative z-10">
                <Github className="w-6 h-6" />
                <ArrowRight className="w-4 h-4 text-zinc-500 -rotate-45 group-hover:rotate-0 group-hover:text-white transition-all" />
              </div>
              <div className="relative z-10">
                <span className="block text-xl font-bold text-white">
                  GitHub
                </span>
                <span className="text-[10px] text-zinc-500 group-hover:text-zinc-300 uppercase tracking-widest font-medium transition-colors">
                  Fathir Adzan Satia
                </span>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
      >
        <span className="text-xs uppercase tracking-widest">
          Scroll to explore
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
};
