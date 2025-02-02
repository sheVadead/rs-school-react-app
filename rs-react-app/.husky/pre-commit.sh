#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# Run lint-staged for formatting/linting only staged files
npx lint-staged

# Run tests before committing (optional)
# npm test

echo "✅ Pre-commit checks passed!"