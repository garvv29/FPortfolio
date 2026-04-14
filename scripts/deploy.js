#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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
  console.log('✅ Copied successfully!\n');
  
  // Step 3: Git operations
  console.log('3️⃣  Committing changes...');
  execSync('git add docs/', { stdio: 'inherit' });
  
  const commitMsg = `Deploy: ${new Date().toLocaleString()}`;
  try {
    execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });
  } catch (e) {
    console.log('   (No changes to commit - docs already up to date)');
  }
  
  console.log('4️⃣  Pushing to GitHub...');
  execSync('git push origin live', { stdio: 'inherit' });
  
  console.log('\n✅ ✅ ✅ DEPLOYMENT COMPLETE! ✅ ✅ ✅');
  console.log('🚀 Portfolio updated at: https://g4rv.me/\n');
  
} catch (error) {
  console.error('\n❌ ERROR:', error.message);
  process.exit(1);
}
