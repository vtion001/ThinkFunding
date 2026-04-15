#!/bin/bash

# Think Funding LLC - Run All Services
# Starts both API and Web in development mode

set -e

echo "Starting Think Funding development services..."

# Function to cleanup on exit
cleanup() {
    echo "Shutting down services..."
    kill $API_PID $WEB_PID 2>/dev/null || true
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start API
echo "Starting API (http://localhost:5000)..."
cd src/api
dotnet run &
API_PID=$!

# Start Web
echo "Starting Web (http://localhost:3000)..."
cd ../web
npm run dev &
WEB_PID=$!

echo ""
echo "════════════════════════════════════════════════════════════"
echo "  Think Funding is running!"
echo ""
echo "  API:  http://localhost:5000"
echo "  Web:  http://localhost:3000"
echo "  Docs: http://localhost:3000/swagger (API)"
echo ""
echo "  Press Ctrl+C to stop"
echo "════════════════════════════════════════════════════════════"

# Wait for both processes
wait
