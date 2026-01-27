import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Briefcase, Layers, FolderOpen, Award } from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch counts
  const [projectCount, techStackCount, certificateCount, experienceCount] =
    await Promise.all([
      prisma.project.count(),
      prisma.techStack.count(),
      prisma.certificate.count(),
      prisma.experience.count(),
    ]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, {session.user?.name}. Here's an overview of your
          portfolio content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Experience Stats */}
        <Link href="/admin/experience">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Experience</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{experienceCount}</div>
              <p className="text-xs text-muted-foreground">
                Career positions listed
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Tech Stack Stats */}
        <Link href="/admin/tech-stack">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tech Stack</CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{techStackCount}</div>
              <p className="text-xs text-muted-foreground">
                Technologies & Tools
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Projects Stats */}
        <Link href="/admin/projects">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projectCount}</div>
              <p className="text-xs text-muted-foreground">
                Showcased projects
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Certificates Stats */}
        <Link href="/admin/certificates">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Certificates
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{certificateCount}</div>
              <p className="text-xs text-muted-foreground">
                Achievements & Certs
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
