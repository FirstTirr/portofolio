import prisma from "@/lib/prisma";
import { addProject, deleteProject } from "@/app/lib/crud-actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, Github, Globe } from "lucide-react";

import { ImageUpload } from "@/components/admin/image-upload";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Create Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add New Project</CardTitle>
              <CardDescription>Showcase your best work.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={addProject} className="flex flex-col gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. E-Commerce Dashboard"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description (Markdown supported)
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the project..."
                    className="h-32"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="demoUrl">Demo URL</Label>
                    <Input
                      id="demoUrl"
                      name="demoUrl"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="repoUrl">GitHub URL</Label>
                    <Input
                      id="repoUrl"
                      name="repoUrl"
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <ImageUpload name="imageUrl" label="Project Image" />

                <div className="space-y-2">
                  <Label htmlFor="techStack">
                    Tech Stack (comma separated)
                  </Label>
                  <Input
                    id="techStack"
                    name="techStack"
                    placeholder="React, Next.js, Tailwind, Prisma"
                  />
                </div>
                <Button type="submit">Add Project</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Projects List</h2>
          <div className="space-y-4">
            {projects.map((item) => (
              <Card key={item.id}>
                <CardHeader className="flex flex-row justify-between items-start pb-2">
                  <div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-1">
                      {item.slug}
                    </CardDescription>
                  </div>
                  <DeleteButton id={item.id} action={deleteProject} />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {item.demoUrl && (
                      <a
                        href={item.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center gap-1 hover:underline"
                      >
                        <Globe size={14} /> Demo
                      </a>
                    )}
                    {item.repoUrl && (
                      <a
                        href={item.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center gap-1 hover:underline"
                      >
                        <Github size={14} /> Repo
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
