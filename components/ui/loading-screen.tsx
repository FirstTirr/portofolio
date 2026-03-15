"use client";

import { motion } from "framer-motion";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative flex items-center justify-center">
        {/* Outer interacting circles */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-32 w-32 rounded-full border-t-2 border-r-2 border-primary/30"
        />
        
        <motion.div
           animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-24 w-24 rounded-full border-b-2 border-l-2 border-primary/60"
        />

        {/* Center pulsing core */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-12 w-12 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center"
        >
             <div className="h-4 w-4 rounded-full bg-primary" />
        </motion.div>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-16 text-sm font-mono tracking-widest text-muted-foreground"
        >
          LOADING...
        </motion.p>
      </div>
    </div>
  );
};
