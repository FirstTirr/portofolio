import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import prisma from "@/lib/prisma";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

// Define interface locally
interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  credentialUrl: string | null;
  imageUrl: string | null;
}

export const dynamic = "force-dynamic";

// Define the type for the props explicitly
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CertificatesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page) || 1;
  const itemsPerPage = 9;
  const skip = (page - 1) * itemsPerPage;

  const certificates = await prisma.certificate.findMany({
    orderBy: { issueDate: "desc" },
    skip,
    take: itemsPerPage,
  });

  const totalCount = await prisma.certificate.count();
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <Navbar />
      
      <main className="container max-w-6xl mx-auto py-32 px-6">
        <div className="flex flex-col items-center mb-16 text-center">
           <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-8 bg-primary/50"></span>
            <span className="text-sm font-news font-medium text-primary uppercase tracking-widest">
              Success Stories
            </span>
             <span className="h-px w-8 bg-primary/50"></span>
           </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All Certifications
          </h1>
           <p className="text-xl text-muted-foreground max-w-2xl">
              A comprehensive list of my professional certifications and achievements.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {certificates.map((cert: Certificate) => (
            <div
              key={cert.id}
              className="group relative bg-card border border-border/50 rounded-3xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-2xl"
            >
              {/* Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-secondary">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img
                  src={cert.imageUrl || "https://placehold.co/600x400/101010/FFF?text=Certificate"}
                  alt={cert.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                />
                 {cert.credentialUrl && (
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      href={cert.credentialUrl}
                      target="_blank"
                      className="p-3 bg-background/80 backdrop-blur-md rounded-full text-foreground hover:text-primary transition-colors block"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  </div>
                 )}
              </div>

              <div className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors line-clamp-2">
                      {cert.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mt-1">
                      {cert.issuer}
                    </p>
                  </div>
                  <span className="text-xs font-mono py-1 px-2 rounded bg-secondary text-muted-foreground whitespace-nowrap ml-2">
                    {format(new Date(cert.issueDate), "MMM yyyy")}
                  </span>
                </div>
              </div>
            </div>
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
              <Link href={`/certificates?page=${page - 1}`}>
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
              <Link href={`/certificates?page=${page + 1}`}>
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
