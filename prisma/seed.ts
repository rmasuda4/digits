import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';

const prisma = new PrismaClient();
const settings = JSON.parse(readFileSync('config/settings.development.json', 'utf-8'));

async function main() {
  console.log('Seeding the database');

  // --- Users ---
  for (const user of settings.defaultAccounts) {
    const { email, password, role } = user;
    prisma.user.upsert({
      where: { email },
      update: {},
      create: { email, password, role },
    });
    console.log(`  Created user: ${email} with role: ${role || 'USER'}`);
  }

  // --- Stuff ---
  for (const item of settings.defaultData) {
    prisma.stuff.upsert({
      where: { id: item.id ?? 0 },
      update: {},
      create: item,
    });
    console.log(`  Added stuff: ${item.name} (${item.owner})`);
  }

  // --- Contacts ---
  // Clear existing contacts first (optional, only for development)
  await prisma.contact.deleteMany({});

  for (const contact of settings.defaultContacts) {
    prisma.contact.create({
      data: contact,
    });
    console.log(`  Added contact: ${contact.firstName} ${contact.lastName}`);
  }
}

main()
  .then(async () => {
    console.log('\n🌱  The seed command has been executed.');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
