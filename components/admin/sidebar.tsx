"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderOpen,
  Layers,
  Award,
  Briefcase,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleSignOut } from "@/app/lib/actions";

export const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: FolderOpen,
  },
  {
    title: "Tech Stack",
    href: "/admin/tech-stack",
    icon: Layers,
  },
  {
    title: "Certificates",
    href: "/admin/certificates",
    icon: Award,
  },
  {
    title: "Experience",
    href: "/admin/experience",
    icon: Briefcase,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="hidden border-r bg-zinc-950 text-white lg:block lg:w-72 lg:shrink-0 flex flex-col h-full shadow-xl">
      <div className="flex h-16 items-center px-6 border-b border-white/10 bg-zinc-900/50 backdrop-blur-xl">
        <div className="flex items-center gap-3 font-bold text-lg tracking-wide">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            AdminPanel
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
        <div>
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-white/40">
            Main Menu
          </h3>
          <nav className="space-y-1">
            {sidebarItems.map((item, index) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-blue-600 shadow-md shadow-blue-500/20 text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      active
                        ? "text-white"
                        : "text-zinc-500 group-hover:text-white",
                    )}
                  />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-white/40">
            System
          </h3>
          <nav className="space-y-1">
            <button className="w-full group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-white/5 hover:text-white transition-all">
              <Settings className="h-5 w-5 text-zinc-500 group-hover:text-white" />
              Settings
            </button>
            <form
              action={async () => {
                await handleSignOut();
              }}
            >
              <button
                type="submit"
                className="w-full group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
              >
                <LogOut className="h-5 w-5 text-zinc-500 group-hover:text-red-400" />
                Sign Out
              </button>
            </form>
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-white/10 bg-zinc-900/30">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3 hover:bg-white/10 transition-colors cursor-pointer border border-white/5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 shadow-lg">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-semibold text-white">
              Administrator
            </p>
            <p className="truncate text-xs text-zinc-400">View Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}
