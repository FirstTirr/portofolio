import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "View Certificate",
};

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cert = await prisma.certificate.findUnique({
    where: { id },
  });

  if (!cert || (!cert.credentialUrl && !cert.imageUrl)) {
    notFound();
  }

  // Prefer credentialUrl (PDF/Doc link), fallback to imageUrl
  const fileUrl = cert.credentialUrl || cert.imageUrl || "";

  // Determine if it's likely a PDF for display logic
  // (though iframe usually handles images too)
  const isPdf = fileUrl.toLowerCase().endsWith(".pdf");

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      {/* Header Bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card shadow-sm z-50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link href="/#certificates">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Kembali</span>
            </Link>
          </Button>

          <div className="flex items-center gap-2 border-l border-border pl-4">
            <h1 className="font-semibold text-sm sm:text-base truncate max-w-[200px] sm:max-w-md">
              {cert.name}
            </h1>
            <span className="text-xs text-muted-foreground hidden sm:inline-block">
              ({cert.issuer})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {fileUrl && (
            <>
              <Button
                size="sm"
                variant="default"
                className="gap-2 hidden sm:flex"
                asChild
              >
                <a
                  href={fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4" />
                  Unduh
                </a>
              </Button>
              <Button size="sm" variant="outline" className="gap-2" asChild>
                <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Buka Tab</span>
                </a>
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 bg-secondary/20 relative w-full h-full p-4 sm:p-8 flex items-center justify-center overflow-auto">
        <div className="w-full h-full max-w-5xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden border border-border/50 relative">
          <iframe
            src={fileUrl}
            className="w-full h-full block"
            title={`Certificate: ${cert.name}`}
          />

          {/* Fallback overlay if iframe fails or is loading (though iframe handles standard loading) */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p>Loading content...</p>
              <p className="text-sm opacity-70">
                If it doesn't appear, use the "Open Tab" button.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
