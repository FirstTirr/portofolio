// scripts/seed-admin.mjs
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = process.argv[2] || "admin";
  const password = process.argv[3] || "admin123.";

  if (!username || !password) {
    console.log("Usage: node scripts/seed-admin.mjs <username> <password>");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    console.log(`Created admin user: ${user.username}`);
  } catch (e) {
    if (e.code === "P2002") {
      console.log(`User '${username}' already exists.`);
    } else {
      console.error(e);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
