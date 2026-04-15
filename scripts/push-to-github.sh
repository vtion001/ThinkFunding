#!/bin/bash
# GitHub Push Script - Run after authenticating with GitHub CLI
# 1. Run: gh auth login
# 2. Then run: ./scripts/push-to-github.sh

echo "Pushing ThinkFunding to GitHub..."

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "Not authenticated. Run: gh auth login"
    exit 1
fi

# Create repo if it doesn't exist
if ! gh repo view vtion001/ThinkFunding &> /dev/null; then
    echo "Creating GitHub repository..."
    gh repo create ThinkFunding --public --push
else
    echo "Repository exists, pushing..."
    git push -u origin main
fi

echo "Done!"
