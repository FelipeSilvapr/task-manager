#!/bin/bash

# Bring up Docker Compose services
echo "Starting Docker Compose..."
docker compose up -d

# Navigate to backend directory
cd src/backend

# Install backend dependencies
echo "Installing backend dependencies..."
npm install

# Export database environment variables
echo "Exporting database environment variables..."
export DB_USER=user
export DB_PASSWORD=password
export DB_HOST=localhost
export DB_NAME=task-manager

# Navigate to the database folder
cd infrastructure/database

# Run database migrations
echo "Running database migrations..."
npx tsx migrations database

# Return to the backend folder and start the backend server
cd ../..
echo "Starting backend server..."
npm run dev &

# Navigate to the frontend directory
cd ../frontend

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Start the frontend server
echo "Starting frontend server..."
npm run dev &

echo "All services started successfully!"
