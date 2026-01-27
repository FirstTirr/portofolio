import prisma from "@/lib/prisma";
import { addExperience, deleteExperience } from "@/app/lib/crud-actions";
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
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { startDate: "desc" },
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
              <CardTitle>Add Experience</CardTitle>
              <CardDescription>
                Add work experience or education.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={addExperience} className="flex flex-col gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position / Role</Label>
                  <Input
                    id="position"
                    name="position"
                    placeholder="e.g. Frontend Developer"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company / Organization</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="e.g. Google"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" name="endDate" type="date" />
                    <p className="text-xs text-muted-foreground">
                      Leave empty if current.
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your responsibilities..."
                    required
                  />
                </div>
                <Button type="submit">Add Experience</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* List */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Experience List</h2>
          <div className="space-y-4">
            {experiences.map((item) => (
              <Card key={item.id}>
                <CardHeader className="flex flex-row justify-between items-start pb-2">
                  <div>
                    <CardTitle className="text-lg">{item.position}</CardTitle>
                    <CardDescription>{item.company}</CardDescription>
                  </div>
                  <DeleteButton id={item.id} action={deleteExperience} />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {format(item.startDate, "MMM yyyy")} -{" "}
                    {item.endDate
                      ? format(item.endDate, "MMM yyyy")
                      : "Present"}
                  </p>
                  <p className="text-sm whitespace-pre-wrap">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
