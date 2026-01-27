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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleSignOut } from "@/app/lib/actions";

const sidebarItems = [
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

export function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-lg font-bold">Admin Panel</h1>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-2">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div className="text-sm">
            <p className="font-medium">Admin</p>
            <p className="text-xs text-muted-foreground">Portfolio Owner</p>
          </div>
        </div>
        <form action={handleSignOut}>
          <Button
            variant="outline"
            className="w-full justify-start gap-3 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </form>
      </div>
    </div>
  );
}

export function AdminSidebar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "hidden border-r bg-card text-card-foreground md:block w-64",
        className,
      )}
    >
      <SidebarContent />
    </div>
  );
}
