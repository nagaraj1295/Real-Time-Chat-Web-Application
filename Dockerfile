# Use Node.js 22 as base
FROM node:22-alpine AS build

# Set working directory
WORKDIR /app

# Copy and install backend dependencies
COPY server/package*.json ./server/
RUN cd server && npm install

# Copy and install frontend dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Final stage
FROM node:22-alpine
WORKDIR /app

# Copy built frontend and backend code
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server

# Expose port
EXPOSE 5001

# Start server
CMD ["node", "server/src/index.js"]
