# Stage 1: Dependencies and Build
FROM node:22.11.0-bullseye-slim AS builder

# Install dumb-init and clean up
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json with proper ownership
COPY --chown=node:node package*.json ./

# Install all dependencies
RUN npm ci

# Copy the application source code with proper ownership
COPY --chown=node:node . .

# Build the application
RUN npm run build

# Stage 2: Serve using Vite preview
FROM node:22.11.0-bullseye-slim

# Install dumb-init and clean up
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Copy the built files and necessary dependencies from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

# Expose the default preview server port (default is 4173)
EXPOSE 4173

# Use dumb-init as the entrypoint for better signal handling
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Command to run the preview server
CMD ["npm", "run", "preview"]
