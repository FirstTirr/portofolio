import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { TechStack } from "@/components/sections/tech-stack";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Certificates } from "@/components/sections/certificates";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import prisma from "@/lib/prisma";

export default async function Home() {
  // Fetch data in parallel
  const [techStackData, projectsData, experienceData, certificatesData] =
    await Promise.all([
      prisma.techStack.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.experience.findMany({ orderBy: { startDate: "desc" } }),
      prisma.certificate.findMany({ orderBy: { issueDate: "desc" } }),
    ]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {/* Scroll Progress moved to client component */}
      <ScrollProgress />

      <Navbar />

      <main className="flex flex-col gap-0 w-full overflow-hidden">
        <Hero />
        <About data={techStackData} />
        <TechStack data={techStackData} />
        <Experience data={experienceData} />
        <Projects data={projectsData} />
        <Certificates data={certificatesData} />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
