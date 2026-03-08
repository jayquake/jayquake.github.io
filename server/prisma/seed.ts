import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

interface SeedSite {
  name: string;
  url: string;
  category: string;
}

async function main() {
  const raw = readFileSync(join(__dirname, 'seeds', 'curated-sites.json'), 'utf-8');
  const sites: SeedSite[] = JSON.parse(raw);

  for (const site of sites) {
    await prisma.curatedSite.upsert({
      where: { url: site.url },
      update: { name: site.name, category: site.category },
      create: { ...site, enabled: true },
    });
  }
  console.log(`Seeded ${sites.length} curated sites`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
