#!/bin/bash
set -e

echo "🔍 Type-checking..."
npx tsc --noEmit

echo "✅ Types OK — building for GitHub Pages..."
npm run build:gh-pages

echo "📦 Committing and pushing..."
git add -A
git commit -m "feat: connect Supabase backend — sync profiles on auth, fix dashboard/id/settings pages"
git push origin main

echo "🚀 Pushed! GitHub Actions will deploy to Pages automatically."
echo "   Watch progress at: https://github.com/AllergyLink/allergylink/actions"
