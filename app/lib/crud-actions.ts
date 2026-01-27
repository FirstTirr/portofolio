"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- Tech Stack ---
export async function addTechStack(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const icon = formData.get("icon") as string;

  await prisma.techStack.create({
    data: { name, category, icon },
  });
  revalidatePath("/admin/tech-stack");
}

export async function deleteTechStack(id: string) {
  const session = await auth();
  if (!session) return;
  await prisma.techStack.delete({ where: { id } });
  revalidatePath("/admin/tech-stack");
}

// --- Projects ---
export async function addProject(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const demoUrl = formData.get("demoUrl") as string;
  const repoUrl = formData.get("repoUrl") as string;
  const techStackString = formData.get("techStack") as string;

  // Generate slug from title
  const slug =
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") +
    "-" +
    Date.now().toString().slice(-4);

  const techStack = techStackString
    ? techStackString
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  await prisma.project.create({
    data: {
      title,
      description,
      slug,
      imageUrl,
      demoUrl,
      repoUrl,
      techStack,
    },
  });
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session) return;
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
}

// --- Certificates ---
export async function addCertificate(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const name = formData.get("name") as string;
  const issuer = formData.get("issuer") as string;
  const issueDateStr = formData.get("issueDate") as string;
  const credentialUrl = formData.get("credentialUrl") as string;
  const imageUrl = formData.get("imageUrl") as string;

  await prisma.certificate.create({
    data: {
      name,
      issuer,
      issueDate: new Date(issueDateStr),
      credentialUrl,
      imageUrl,
    },
  });
  revalidatePath("/admin/certificates");
}

export async function deleteCertificate(id: string) {
  const session = await auth();
  if (!session) return;
  await prisma.certificate.delete({ where: { id } });
  revalidatePath("/admin/certificates");
}

// --- Experience ---
export async function addExperience(formData: FormData) {
  const session = await auth();
  if (!session) return;

  const position = formData.get("position") as string;
  const company = formData.get("company") as string;
  const startDateStr = formData.get("startDate") as string;
  const endDateStr = formData.get("endDate") as string;
  const description = formData.get("description") as string;

  // If endDate is empty, treat as null (Present)
  const endDate = endDateStr ? new Date(endDateStr) : null;

  await prisma.experience.create({
    data: {
      position,
      company,
      startDate: new Date(startDateStr),
      endDate,
      description,
    },
  });
  revalidatePath("/admin/experience");
}

export async function deleteExperience(id: string) {
  const session = await auth();
  if (!session) return;
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/admin/experience");
}
