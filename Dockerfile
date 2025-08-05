# Use Bun's official image
FROM oven/bun:1 as base

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application (if needed)
RUN bun run build

# Production stage
FROM oven/bun:1-slim as production

WORKDIR /app

# Copy built application and dependencies
COPY --from=base /app/package.json ./
COPY --from=base /app/bun.lock ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/src ./src

# Create non-root user
RUN addgroup --system --gid 1001 bun
RUN adduser --system --uid 1001 bun
USER bun

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD bun run health-check || exit 1

# Start the application
CMD ["bun", "run", "start"] 