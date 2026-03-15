import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import prisma from "@/lib/prisma";
import { Layout } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page) || 1;
  const itemsPerPage = 9;
  const skip = (page - 1) * itemsPerPage;

  const [projects_data, totalCount] = await Promise.all([
    prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: itemsPerPage,
    }),
    prisma.project.count(),
  ]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Map to ProjectCard props format
  const mappedProjects = (projects_data as any[]).map((p: any) => ({
    title: p.title,
    description: p.description,
    tech: p.techStack,
    link: p.demoUrl || p.repoUrl || "#",
    imageUrl: p.imageUrl,
    demoUrl: p.demoUrl,
    repoUrl: p.repoUrl,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <Navbar />

      <main className="container max-w-6xl mx-auto py-32 px-6">
        <div className="flex flex-col items-center mb-16 text-center">
           <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-8 bg-primary/50"></span>
            <span className="text-sm font-news font-medium text-primary uppercase tracking-widest">
              My Works
            </span>
             <span className="h-px w-8 bg-primary/50"></span>
           </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All Projects
          </h1>
           <p className="text-xl text-muted-foreground max-w-2xl">
              A curated list of projects I&apos;ve worked on, showcasing my skills in frontend and full-stack development.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {mappedProjects.map((project: any, index: number) => (
             <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

         {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4">
          <Button
            variant="outline"
            disabled={page <= 1}
            asChild={page > 1}
          >
            {page > 1 ? (
              <Link href={`/projects?page=${page - 1}`}>
                <span className="flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" /> Previous
                </span>
              </Link>
            ) : (
              <span className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                 <ChevronLeft className="w-4 h-4" /> Previous
              </span>
            )}
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages || 1}
          </span>

          <Button
            variant="outline"
            disabled={page >= totalPages}
            asChild={page < totalPages}
          >
             {page < totalPages ? (
              <Link href={`/projects?page=${page + 1}`}>
                <span className="flex items-center gap-2">
                  Next <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ) : (
               <span className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                 Next <ChevronRight className="w-4 h-4" />
               </span>
            )}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
