import { execSync } from 'child_process';

try {
  execSync('npx tsx lib/seed.ts', { stdio: 'inherit' });
} catch (error) {
  console.error('Seeding failed:', error);
  process.exit(1);
}