#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
  console.log('📦 Deploying to GitHub Pages...\n');
  
  // Step 1: Remove old docs folder
  console.log('1️⃣  Cleaning /docs folder...');
  const docsPath = path.join(__dirname, '../docs');
  if (fs.existsSync(docsPath)) {
    fs.rmSync(docsPath, { recursive: true, force: true });
  }
  
  // Step 2: Copy dist to docs
  console.log('2️⃣  Copying dist to /docs...');
  const distPath = path.join(__dirname, '../dist');
  fs.cpSync(distPath, docsPath, { recursive: true });
  
  // Step 3: Copy CNAME file to preserve custom domain
  console.log('3️⃣  Adding CNAME for custom domain...');
  const cnameSrc = path.join(__dirname, '../CNAME');
  const cnameDest = path.join(docsPath, 'CNAME');
  if (fs.existsSync(cnameSrc)) {
    fs.copyFileSync(cnameSrc, cnameDest);
  }
  console.log('✅ Copied successfully!\n');
  
  // Step 4: Git operations
  console.log('4️⃣  Committing changes...');
  execSync('git add docs/', { stdio: 'inherit' });
  
  const commitMsg = `Deploy: ${new Date().toLocaleString()}`;
  try {
    execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });
  } catch (e) {
    console.log('   (No changes to commit - docs already up to date)');
  }
  
  console.log('5️⃣  Pushing to GitHub...');
  execSync('git push origin live', { stdio: 'inherit' });
  
  console.log('\n✅ ✅ ✅ DEPLOYMENT COMPLETE! ✅ ✅ ✅');
  console.log('🚀 Portfolio updated at: https://g4rv.me/\n');
  
} catch (error) {
  console.error('\n❌ ERROR:', error.message);
  process.exit(1);
}
