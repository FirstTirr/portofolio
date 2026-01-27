"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Code,
  Home,
  User,
  Mail,
  Award,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useState } from "react";

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#", label: "Home", icon: Home },
    { href: "#about", label: "About", icon: User },
    { href: "#experience", label: "History", icon: Briefcase },
    { href: "#projects", label: "Work", icon: Code },
    { href: "#certificates", label: "Awards", icon: Award },
    { href: "#contact", label: "Hello", icon: Mail },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 pointer-events-none px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          width: isOpen ? "90%" : "auto",
          borderRadius: isOpen ? "1.5rem" : "9999px",
        }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className={cn(
          "pointer-events-auto bg-background/80 backdrop-blur-xl border border-border/50 flex flex-col md:flex-row items-center shadow-lg shadow-primary/5 overflow-hidden",
          isOpen ? "p-4" : "px-3 py-2 rounded-full",
        )}
      >
        <div className="flex w-full md:w-auto justify-between items-center gap-2">
          {/* Logo or Brand for Mobile when open */}
          {isOpen && <span className="font-bold ml-2 md:hidden">Menu</span>}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                pathname === link.href ||
                (pathname === "/" && link.href === "#");

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-colors hover:text-primary",
                    "text-muted-foreground group flex items-center gap-2",
                    isActive && "text-primary",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-secondary rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden ml-auto">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Desktop Theme Toggle Divider */}
          <div className="hidden md:block mx-1 h-4 w-[1px] bg-border" />
          <div className="hidden md:block">
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Expanded Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full md:hidden"
            >
              <div className="flex flex-col gap-2 pt-4 pb-2">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                      >
                        <div className="p-2 bg-secondary rounded-lg">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-lg">
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};
