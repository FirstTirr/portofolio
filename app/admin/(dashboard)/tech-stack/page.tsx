import prisma from "@/lib/prisma";
import { addTechStack, deleteTechStack } from "@/app/lib/crud-actions";
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
import { ArrowLeft } from "lucide-react";

import { ImageUpload } from "@/components/admin/image-upload";

export default async function AdminTechStackPage() {
  const techStacks = await prisma.techStack.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto p-8">
      <Link
        href="/admin"
        className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-primary"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Create Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add New Tech Stack</CardTitle>
              <CardDescription>
                Add a new technology to your skill set.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={addTechStack} className="flex flex-col gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Technology Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. React, Python, or Figma"
                    required
                  />
                </div>

                {/* Hidden category input, defaulting to General */}
                <input type="hidden" name="category" value="General" />

                <ImageUpload name="icon" label="Logo Image (Drag & Drop)" />

                <Button type="submit">Add Technology</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Existing Tools</h2>
          <div className="grid gap-4">
            {techStacks.map((item) => (
              <Card key={item.id}>
                <CardContent className="flex justify-between items-center p-4">
                  <div className="flex items-center gap-3">
                    {item.icon ? (
                      <div className="w-12 h-12 relative bg-secondary/20 rounded-md overflow-hidden flex items-center justify-center p-2">
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-secondary/20 rounded-md flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">
                          No Icon
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                    </div>
                  </div>
                  <DeleteButton id={item.id} action={deleteTechStack} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
