FROM node:22-slim AS base

# Set up the environment
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Configure the working directory
WORKDIR /app

# Copy the dependency files into the container
COPY package.json pnpm-lock.yaml .

# Install production dependencies
FROM base AS production
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Install build-time dependencies
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# Copy production dependencies and build artifacts into the container
FROM base
COPY --from=production /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

# Expose the required port and start the application
EXPOSE 3000
ENTRYPOINT pnpm run start:prod
