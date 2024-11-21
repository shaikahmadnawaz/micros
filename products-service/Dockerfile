# Stage 1: Dependencies
FROM node:22.11.0-bullseye-slim AS dependencies

# Install dumb-init and clean up
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && \
    rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV NODE_ENV=production

# Set working directory
WORKDIR /usr/src/app

# Copy package and lock files with proper ownership
COPY --chown=node:node package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Stage 2: Application
FROM node:22.11.0-bullseye-slim AS runtime

# Install dumb-init for signal handling
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Copy dependencies from the previous stage
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

# Copy the rest of the application code with proper ownership
COPY --chown=node:node . .

# Expose the application port
EXPOSE 5002

# Switch to the node user for runtime
USER node

# Use dumb-init for signal handling
ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# Start the application
CMD ["node", "index.js"]
