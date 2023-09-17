import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({where: {email}}).catch(() => {});

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({data: {email, password: {create: {hash: hashedPassword}}}});

  await prisma.note.create({data: {title: "My First Note", body: "Hello World!", userId: user.id}});
  await prisma.note.create({data: {title: "My Second Note", body: "Hello Universe!", userId: user.id}});
  await prisma.note.create({data: {title: "My Third Note", body: "Hello Galaxy!", userId: user.id}});

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
