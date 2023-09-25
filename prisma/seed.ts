import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({where: {email}}).catch(() => {});
  await prisma.contact.deleteMany();

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({data: {email, password: {create: {hash: hashedPassword}}}});

  await prisma.note.create({data: {title: "My First Note", body: "Hello World!", userId: user.id}});
  await prisma.note.create({data: {title: "My Second Note", body: "Hello Universe!", userId: user.id}});
  await prisma.note.create({data: {title: "My Third Note", body: "Hello Galaxy!", userId: user.id}});

  const contacts = [
    {
      avatar: "https://sessionize.com/image/124e-400o400o2-wHVdAuNaxi8KJrgtN3ZKci.jpg",
      first: "Shruti",
      last: "Kapoor",
      twitter: "@shrutikapoor08",
    },
    {
      avatar: "https://sessionize.com/image/1940-400o400o2-Enh9dnYmrLYhJSTTPSw3MH.jpg",
      first: "Glenn",
      last: "Reyes",
      twitter: "@glnnrys",
    },
    {
      avatar: "https://sessionize.com/image/9273-400o400o2-3tyrUE3HjsCHJLU5aUJCja.jpg",
      first: "Ryan",
      last: "Florence",
    },
    {
      avatar: "https://sessionize.com/image/d14d-400o400o2-pyB229HyFPCnUcZhHf3kWS.png",
      first: "Oscar",
      last: "Newman",
      twitter: "@__oscarnewman",
    },
    {
      avatar: "https://sessionize.com/image/fd45-400o400o2-fw91uCdGU9hFP334dnyVCr.jpg",
      first: "Michael",
      last: "Jackson",
    },
    {
      avatar: "https://sessionize.com/image/b07e-400o400o2-KgNRF3S9sD5ZR4UsG7hG4g.jpg",
      first: "Christopher",
      last: "Chedeau",
      twitter: "@Vjeux",
    },
  ];

  for (const contact of contacts) {
    await prisma.contact.create({data: {...contact}});
  }

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
