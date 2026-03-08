# Multi-stage build for optimized production image
# Stage 1: build the Vite/React app
# Stage 2: serve the static output with nginx

# ---- Stage 1: Builder -------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# Copy manifests and install deps (layer-cached until package.json changes)
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

# Copy source and build
COPY . .
RUN npm run build
# Output: /app/dist

# ---- Stage 2: Production server (nginx) -------------------------------------
FROM nginx:1.27-alpine AS runner

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx config: handles SPA client-side routing (react-router fallback)
COPY nginx.spa.conf /etc/nginx/conf.d/default.conf

# Expose port expected by the host reverse proxy
EXPOSE 3334

CMD ["nginx", "-g", "daemon off;"]
