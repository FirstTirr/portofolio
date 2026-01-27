"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Import next/image
import { Button } from "@/components/ui/button";
import { Certificate as CertificateModel } from "@prisma/client";
import { format } from "date-fns";

interface CertificatesProps {
  data: CertificateModel[];
}

export const Certificates = ({ data }: CertificatesProps) => {
  if (!data || data.length === 0) return null;

  const mappedCertificates = data.map((c) => ({
    id: c.id,
    title: c.name,
    issuer: c.issuer,
    date: format(new Date(c.issueDate), "yyyy"), // Extract year for simple display
    link: c.credentialUrl,
    image:
      c.imageUrl || "https://placehold.co/600x400/101010/FFF?text=Certificate",
  }));

  return (
    <section id="certificates" className="py-32 px-6 bg-secondary/5 relative">
      {/* Visual Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-8 bg-primary/50"></span>
            <span className="text-sm font-news font-medium text-primary uppercase tracking-widest">
              Pencapaian
            </span>
            <span className="h-px w-8 bg-primary/50"></span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold"
          >
            Sertifikat
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mappedCertificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col bg-card border border-border/50 rounded-3xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-2xl"
            >
              {/* Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-secondary">
                {/* You would use next/image here with real images */}
                {/* For now using a div with fallback or the img tag for external placeholders */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  {cert.link && (
                    <Link
                      href={cert.link}
                      className="p-3 bg-background/80 backdrop-blur-md rounded-full text-foreground hover:text-primary transition-colors block"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>

              <div className="p-6 relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 mr-4">
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 font-medium">
                      {cert.issuer}
                    </p>
                  </div>
                  <span className="text-xs font-mono py-1 px-2 rounded bg-secondary text-muted-foreground shrink-0">
                    {cert.date}
                  </span>
                </div>

                <div className="mt-auto pt-4 border-t border-border/50">
                  <Button
                    asChild
                    variant="secondary"
                    size="sm"
                    className="w-full group/btn hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Link href={`/certificate/${cert.id}`}>
                      Lihat
                      <ExternalLink className="w-4 h-4 ml-2 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
