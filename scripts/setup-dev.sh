#!/bin/bash

# Think Funding LLC - Development Setup Script
# Run this once to set up your local development environment

set -e

echo "🚀 Setting up Think Funding development environment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

command -v dotnet >/dev/null 2>&1 || { echo "❌ .NET SDK is required but not installed. Visit https://dotnet.microsoft.com/download"; exit 1; }
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed. Visit https://nodejs.org"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed."; exit 1; }

dotnet --version
node --version
npm --version

echo -e "${GREEN}✓ All prerequisites installed${NC}"

# Setup API
echo -e "${YELLOW}Setting up API...${NC}"
cd src/api
dotnet restore

# Create local settings if not exists
if [ ! -f "appsettings.Local.json" ]; then
    cat > appsettings.Local.json << 'EOF'
{
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft.AspNetCore": "Information"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=ThinkFunding;Trusted_Connection=true;TrustServerCertificate=true;"
  }
}
EOF
    echo "Created appsettings.Local.json"
fi

echo -e "${GREEN}✓ API setup complete${NC}"

# Setup Web
echo -e "${YELLOW}Setting up Web...${NC}"
cd ../web
npm install

# Create .env.local if not exists
if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo "Created .env.local from template - please configure it"
fi

echo -e "${GREEN}✓ Web setup complete${NC}"

# Go back to root
cd ../..

echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  Setup complete!${NC}"
echo ""
echo "  Next steps:"
echo "  1. Configure database connection string in src/api/appsettings.Local.json"
echo "  2. Configure environment variables in src/web/.env.local"
echo "  3. Run API: cd src/api && dotnet run"
echo "  4. Run Web: cd src/web && npm run dev"
echo ""
echo "  API: http://localhost:5000"
echo "  Web: http://localhost:3000"
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
