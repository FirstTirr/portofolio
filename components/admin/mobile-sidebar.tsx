"use client";

import { useState, useEffect } from "react";
import { SidebarContent } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between border-b px-4 py-3 bg-card">
        <span className="font-bold">Admin Panel</span>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar Drawer */}
          <div
            className={cn(
              "relative w-72 bg-card h-full shadow-xl flex flex-col transition-all duration-300 animate-in slide-in-from-left",
            )}
          >
            <div className="absolute top-2 right-2 z-50">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}
    </div>
  );
}
