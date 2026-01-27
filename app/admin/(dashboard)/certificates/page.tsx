import prisma from "@/lib/prisma";
import { Certificate } from "@prisma/client";
import { addCertificate, deleteCertificate } from "@/app/lib/crud-actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { format } from "date-fns";

import { ImageUpload } from "@/components/admin/image-upload";

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { issueDate: "desc" },
  });

  return (
    <div className="container mx-auto p-8">
      <Link
        href="/admin"
        className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-primary"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add Certificate</CardTitle>
              <CardDescription>
                Add a new certification or award.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={addCertificate} className="flex flex-col gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Certificate Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. AWS Certified Developer"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issuer">Issuer</Label>
                  <Input
                    id="issuer"
                    name="issuer"
                    placeholder="e.g. Amazon Web Services"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input id="issueDate" name="issueDate" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credentialUrl">Credential URL</Label>
                  <Input
                    id="credentialUrl"
                    name="credentialUrl"
                    placeholder="https://..."
                  />
                </div>

                <ImageUpload name="imageUrl" label="Certificate Image" />

                <Button type="submit">Add Certificate</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Certificates List</h2>
          <div className="space-y-4">
            {certificates.map((item: Certificate) => (
              <Card key={item.id}>
                <CardHeader className="flex flex-row justify-between items-start pb-2">
                  <div className="flex gap-4">
                    {item.imageUrl && (
                      <div className="w-16 h-12 bg-secondary rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription>{item.issuer}</CardDescription>
                    </div>
                  </div>
                  <DeleteButton id={item.id} action={deleteCertificate} />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Issued: {format(item.issueDate, "MMM yyyy")}
                  </p>
                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                    >
                      View Credential <ExternalLink size={12} />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
