import { PrismaClient, Role } from '@prisma/client';
import { readFileSync } from 'fs';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const settings = JSON.parse(readFileSync('config/settings.development.json', 'utf-8'));

console.log('Seeding the database...');

// --- Users ---
settings.defaultAccounts.forEach((user: { email: string; password: string; role: string }) => {
  const { email, password, role } = user;
  const roleEnum = role === 'ADMIN' ? Role.ADMIN : Role.USER;

  bcrypt.hash(password, 10).then((hashedPassword) => {
    prisma.user.upsert({
      where: { email },
      update: {},
      create: { email, password: hashedPassword, role: roleEnum },
    }).then(() => {
      console.log(`  Created user: ${email} with role: ${roleEnum}`);
    });
  });
});

// --- Stuff ---
settings.defaultData.forEach((item: any) => {
  prisma.stuff.upsert({
    where: { id: item.id ?? 0 },
    update: {},
    create: item,
  }).then(() => {
    console.log(`  Added stuff: ${item.name} (${item.owner})`);
  });
});

// --- Contacts ---
prisma.contact.deleteMany().then(() => {
  settings.defaultContacts.forEach((contact: any) => {
    prisma.contact.create({ data: contact }).then((createdContact) => {
      console.log(`  Added contact: ${createdContact.firstName} ${createdContact.lastName}`);

      // --- Optional placeholder note ---
      prisma.note.create({
        data: {
          contactId: createdContact.id,
          note: 'This is a sample note for testing.',
          owner: 'admin@foo.com',
        },
      }).then(() => {
        console.log(`    Added test note for ${createdContact.firstName}`);
      });
    });
  });
});

// Disconnect after all promises finish
setTimeout(() => {
  prisma.$disconnect();
  console.log('\n🌱 Database seeding complete.');
}, 5000); // give time for all promises to resolve
