import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const start = Date.now();
    const count = await prisma.admin.count();
    const duration = Date.now() - start;

    return NextResponse.json({
      status: "success",
      message: "Database connection successful",
      adminCount: count,
      duration: `${duration}ms`,
      envCheck: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasAuthSecret: !!process.env.AUTH_SECRET,
        nodeEnv: process.env.NODE_ENV,
      },
    });
  } catch (error: any) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Database connection failed",
        error: error.message,
        stack: error.stack,
        envCheck: {
          hasDatabaseUrl: !!process.env.DATABASE_URL,
          hasAuthSecret: !!process.env.AUTH_SECRET,
        },
      },
      { status: 500 },
    );
  }
}
