/* eslint-disable no-await-in-loop */
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { readFileSync } from 'fs';

const prisma = new PrismaClient();
const settings = JSON.parse(readFileSync('config/settings.development.json', 'utf-8'));

async function main() {
  console.log('🌱 Seeding the database...');

  // --- Users ---
  for (const user of settings.defaultAccounts) {
    const password = await hash(user.password, 10);
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { email: user.email, password, role: user.role || 'USER' },
    });
    console.log(`✅ Created user: ${user.email} (${user.role || 'USER'})`);
  }

  // --- Contacts ---
  for (const contact of settings.defaultContacts) {
    await prisma.contact.create({ data: contact });
    console.log(`👤 Added contact: ${contact.firstName} ${contact.lastName}`);
  }

  console.log('\n🎉 Database seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
