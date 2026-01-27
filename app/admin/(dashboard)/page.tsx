import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  Briefcase,
  Layers,
  FolderOpen,
  Award,
  Plus,
  ArrowRight,
  TrendingUp,
  Users,
  Calendar,
  Activity,
  BarChart3,
  Globe,
  Bell,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function AdminDashboard() {
  const [
    projectCount,
    techStackCount,
    certificateCount,
    experienceCount,
    recentProjects,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.techStack.count(),
    prisma.certificate.count(),
    prisma.experience.count(),
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  // Mock data for "Activity" chart
  const activityData = [40, 70, 45, 90, 65, 85, 55, 60, 75, 50, 80, 95];

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 bg-muted/20 min-h-full">
      {/* Top Header Section with Date & Search (Inner Navbar feel) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground flex items-center gap-2 text-sm mt-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8 bg-background" />
          </div>
          <Button size="icon" variant="outline" className="shrink-0">
            <Bell className="h-4 w-4" />
          </Button>
          <Button className="shrink-0 gap-2">
            <Plus className="h-4 w-4" />{" "}
            <span className="hidden sm:inline">Add Item</span>
          </Button>
        </div>
      </div>

      {/* Main Stats Grid - Row 1 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/projects" className="block group">
          <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-all group-hover:-translate-y-0.5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Projects
                  </p>
                  <h3 className="text-3xl font-bold mt-2 text-foreground">
                    {projectCount}
                  </h3>
                  <div className="flex items-center text-xs text-green-600 font-medium mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> +12% growth
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <FolderOpen className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/tech-stack" className="block group">
          <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-all group-hover:-translate-y-0.5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tech Stack
                  </p>
                  <h3 className="text-3xl font-bold mt-2 text-foreground">
                    {techStackCount}
                  </h3>
                  <div className="flex items-center text-xs text-green-600 font-medium mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" /> +5% growth
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <Layers className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/certificates" className="block group">
          <Card className="border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-all group-hover:-translate-y-0.5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Certificates
                  </p>
                  <h3 className="text-3xl font-bold mt-2 text-foreground">
                    {certificateCount}
                  </h3>
                  <div className="flex items-center text-xs text-muted-foreground font-medium mt-1">
                    Verified
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                  <Award className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/experience" className="block group">
          <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-all group-hover:-translate-y-0.5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Experience
                  </p>
                  <h3 className="text-3xl font-bold mt-2 text-foreground">
                    {experienceCount}
                  </h3>
                  <div className="flex items-center text-xs text-muted-foreground font-medium mt-1">
                    Updated
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  <Briefcase className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Mock Graphic Chart Section */}
        <Card className="col-span-1 lg:col-span-4 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  Portfolio Views
                </CardTitle>
                <CardDescription>
                  Visitor activity over the last 12 days
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                Last 30 Days
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full flex items-end justify-between gap-2.5 pt-4 px-2">
              {activityData.map((height, i) => (
                <div
                  key={i}
                  className="group relative w-full h-full flex items-end"
                >
                  <div
                    className="w-full bg-primary/80 rounded-t-sm hover:bg-primary transition-all duration-300 relative cursor-pointer"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {height * 14} Views
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-muted-foreground px-2 border-t pt-2">
              <span>01 Jan</span>
              <span>05 Jan</span>
              <span>10 Jan</span>
              <span>15 Jan</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Panel - "Rame" colorful style */}
        <Card className="col-span-1 lg:col-span-3 shadow-sm bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-900/10 border-indigo-100 dark:border-indigo-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-indigo-500" />
              Quick Actions
            </CardTitle>
            <CardDescription>Shortcut to manage your portfolio</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button
              variant="outline"
              className="w-full justify-between group h-14 bg-background hover:bg-indigo-50 dark:hover:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800 shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600">
                  <Plus className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <span className="block font-semibold line-clamp-1">
                    New Project
                  </span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              className="w-full justify-between group h-14 bg-background hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <span className="block font-semibold line-clamp-1">
                    Add Experience
                  </span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground p-3 bg-background/60 dark:bg-black/20 rounded-lg border border-dashed">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              System Status: Operational
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card className="shadow-sm">
        <CardHeader className="border-b bg-muted/30 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent Projects</CardTitle>
              <CardDescription>
                Recently added to your portfolio
              </CardDescription>
            </div>
            <Link href="/admin/projects">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:bg-primary/10"
              >
                View All Projects
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {recentProjects.map((project, i) => (
              <div
                key={project.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-muted/50 transition-colors gap-4"
              >
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground font-mono text-xs w-6 hidden sm:block">
                    0{i + 1}
                  </span>
                  <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600">
                    <FolderOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      {project.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 justify-between sm:justify-end w-full sm:w-auto pl-14 sm:pl-0">
                  <div className="flex items-center px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wide">
                    <Globe className="h-3 w-3 mr-1" /> Published
                  </div>
                  <div className="text-xs text-muted-foreground min-w-[80px] text-right">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
            {recentProjects.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <FolderOpen className="h-12 w-12 opacity-20 mb-2" />
                <p className="text-sm">No recent projects found.</p>
                <p className="text-xs">
                  Create your first project to see it here.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
