"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const Preloader = ({ children }: { children?: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Generate fixed stars for consistent hydration
  const stars = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: (i * 17) % 100, // Psuedo-random positions
    y: (i * 23) % 100,
    size: (i % 3) + 1,
    delay: (i % 5) * 0.5,
  }));

  return (
    <>
      <div className={`transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        {children}
      </div>

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)", transition: { duration: 1.2, ease: "easeInOut" } }}
            className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center overflow-hidden pointer-events-auto"
          >
            {/* Deep Space Background */}
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute bg-white rounded-full opacity-0"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size > 2 ? star.size / 2 : star.size,
                  height: star.size > 2 ? star.size / 2 : star.size,
                }}
                animate={{
                  opacity: [0, 0.7, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + (star.id % 4),
                  repeat: Infinity,
                  delay: star.delay,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Central Aerospace Visualization */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              
              <div className="relative w-64 h-64 flex items-center justify-center">
                
                {/* Orbital Ring 1 (Large) */}
                <motion.div 
                  className="absolute w-full h-full rounded-full border-[1px] border-white/10"
                  style={{ rotateX: 60, rotateZ: 0 }}
                  animate={{ rotateZ: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                   <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white] -translate-x-1/2 -translate-y-1/2" />
                </motion.div>

                {/* Orbital Ring 2 (Medium) */}
                 <motion.div 
                  className="absolute w-44 h-44 rounded-full border-[1px] border-white/20"
                  style={{ rotateX: 60, rotateY: 45 }}
                  animate={{ rotateZ: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                   <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_cyan] -translate-x-1/2 translate-y-1/2" />
                </motion.div>

                {/* Central Gravity Well / Planet */}
                <motion.div 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ duration: 1.5, ease: "easeOut" }}
                   className="w-16 h-16 bg-black rounded-full border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)] relative z-20 flex items-center justify-center"
                >
                    <div className="w-12 h-12 bg-white/5 rounded-full backdrop-blur-md" />
                </motion.div>
                
                {/* Scanning Line */}
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 120, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="absolute w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"
                />
              </div>

              {/* Minimal Aerospace Typography */}
              <motion.div
                initial={{ opacity: 0, letterSpacing: "0.1em" }}
                animate={{ opacity: 1, letterSpacing: "0.3em" }}
                transition={{ delay: 0.8, duration: 1.5 }}
                className="mt-8 text-center"
              >
                <h2 className="text-white/80 text-xs font-light font-mono">MISSION CONTROL</h2>
                <div className="flex justify-center gap-8 mt-4 text-[10px] text-white/40 font-mono">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
                        ALT: 400km
                    </motion.div>
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
                         VEL: 7.8km/s
                    </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
