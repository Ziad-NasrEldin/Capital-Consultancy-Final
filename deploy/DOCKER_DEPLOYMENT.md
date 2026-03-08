# Capital Consultancy AG — VPS Deployment Guide

**Stack**: React 19 + Vite 7 (static SPA)  
**Containerization**: Docker + Docker Compose  
**Reverse Proxy**: Nginx (host) → Nginx container (port 3090)  
**SSL**: Let's Encrypt via Certbot

---

## Architecture

```
Internet (443/80)
       │
   Host Nginx               ← /etc/nginx/sites-available/capital-consultancy.conf
       │ reverse proxy
       ↓
  Docker container          ← capital_consultancy_app (port 3090:80)
  (nginx:alpine)
       │ serves static files
       ↓
  /usr/share/nginx/html     ← built from dist/ by multi-stage Dockerfile
```

---

## Files Overview

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage build: Node 20 (npm ci + vite build) → nginx:alpine (serve) |
| `nginx.conf` | Container-level Nginx: SPA routing, asset caching, gzip |
| `.dockerignore` | Excludes node_modules, dist, .git from build context |
| `docker-compose.yml` | Runs the container; maps host:3090 → container:80 |
| `deploy/nginx.conf.example` | Host Nginx: HTTPS, SSL, security headers, proxy to container |
| `deploy/setup-docker.sh` | One-time VPS bootstrap (Docker, Nginx, Certbot, UFW) |

---

## Prerequisites

- Ubuntu 22.04 or 24.04 VPS
- A domain name pointed to your VPS IP (A record)
- SSH access as root or sudo user
- Git installed on the VPS

---

## Step 1 — Initial VPS Setup (one-time)

SSH into your VPS and run the automated setup script:

```bash
ssh root@YOUR_VPS_IP

# Download and run the setup script
sudo bash setup-docker.sh
```

This installs: Docker, Docker Compose, Nginx, Certbot, UFW firewall rules.

---

## Step 2 — Clone the Repository

```bash
mkdir -p /var/docker/apps/capital-consultancy
cd /var/docker/apps/capital-consultancy

git clone https://github.com/YOUR_ORG/Capital-Consultancy-Final.git .
```

---

## Step 3 — Build and Start the Container

```bash
cd /var/docker/apps/capital-consultancy

# Build the Docker image and start the container
docker-compose up -d --build

# Verify it's running
docker-compose ps
```

Expected output:
```
NAME                       STATUS    PORTS
capital_consultancy_app    running   0.0.0.0:3090->80/tcp
```

Test locally on the VPS:
```bash
curl -I http://localhost:3090
# Expected: HTTP/1.1 200 OK
```

---

## Step 4 — Configure Host Nginx

```bash
# Copy and rename the example config
sudo cp /var/docker/apps/capital-consultancy/deploy/nginx.conf.example \
        /etc/nginx/sites-available/capital-consultancy.conf

# Replace YOUR_DOMAIN.com with your actual domain (e.g. capitalconsultancy.com)
sudo sed -i 's/YOUR_DOMAIN.com/capitalconsultancy.com/g' \
    /etc/nginx/sites-available/capital-consultancy.conf

# Enable the site
sudo ln -s /etc/nginx/sites-available/capital-consultancy.conf \
           /etc/nginx/sites-enabled/

# Remove default site (if not already done)
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 5 — Obtain SSL Certificate

```bash
# Make sure DNS A record points YOUR_DOMAIN.com → VPS IP before running this
sudo certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com

# Follow the prompts; Certbot will update your nginx config automatically
# Auto-renewal is configured by default — verify:
sudo systemctl status certbot.timer
```

---

## Step 6 — Verify Deployment

```bash
# Check container
docker-compose ps
docker-compose logs capital-consultancy

# Test HTTPS
curl -I https://YOUR_DOMAIN.com
# Expected: HTTP/2 200

# Test SPA routing (must also return 200, not 404)
curl -I https://YOUR_DOMAIN.com/about
curl -I https://YOUR_DOMAIN.com/services
```

---

## Updating the Application

```bash
cd /var/docker/apps/capital-consultancy

# Pull latest code
git pull origin main

# Rebuild and redeploy (zero-downtime by Compose)
docker-compose up -d --build

# Remove old images to free disk
docker image prune -f
```

---

## Management Commands

### View Logs
```bash
docker-compose logs -f
docker-compose logs -f capital-consultancy
```

### Restart Container
```bash
docker-compose restart capital-consultancy
```

### Stop / Start
```bash
docker-compose down       # Stop and remove container
docker-compose up -d      # Start (uses existing image)
```

### Shell into Container
```bash
docker exec -it capital_consultancy_app sh
```

---

## Troubleshooting

### Container exits immediately
```bash
docker-compose logs capital-consultancy
# Look for nginx config errors
```

### 502 Bad Gateway from host Nginx
```bash
# Check container is running and on the right port
docker-compose ps
curl http://localhost:3090

# Check nginx error log
sudo tail -n 50 /var/log/nginx/capital-consultancy-error.log
```

### React Router routes return 404
The container Nginx is configured with `try_files $uri $uri/ /index.html` which handles this.  
If you're still seeing 404s, verify `nginx.conf` was correctly copied into the image:
```bash
docker exec capital_consultancy_app cat /etc/nginx/nginx.conf | grep try_files
```

### SSL certificate not renewing
```bash
sudo certbot renew --dry-run
sudo systemctl status certbot.timer
```

---

## Security Notes

- The container runs Nginx as a non-root user (nginx:alpine default)
- `server_tokens off` hides Nginx version in headers
- HSTS header enforces HTTPS for 1 year
- Hidden files (`.env`, `.git`) are denied by Nginx location rule
- Docker network is isolated (`capital_consultancy_network` bridge)
