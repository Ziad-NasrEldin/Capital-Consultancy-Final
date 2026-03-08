# =============================================================================
# Capital Consultancy AG — Docker Image
# Multi-stage build: Node.js (build) → Nginx Alpine (serve)
# =============================================================================

# ---- Stage 1: Build --------------------------------------------------------
FROM node:25-alpine AS builder

WORKDIR /app

# Copy dependency manifests first (layer caching)
COPY package.json package-lock.json ./

# Clean install — uses exact versions from lockfile
RUN npm ci

# Copy source code
COPY . .

# Build production bundle → outputs to /app/dist
RUN npm run build

# ---- Stage 2: Serve --------------------------------------------------------
FROM nginx:alpine AS runner

# Remove default nginx config and html
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy container-level nginx configuration (SPA routing + caching)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
