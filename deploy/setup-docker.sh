#!/bin/bash

# =============================================================================
# Capital Consultancy AG — VPS Setup Script
# Installs: Docker, Docker Compose, Nginx, Certbot
# =============================================================================
# Run with: sudo bash setup-docker.sh
# Compatible with: Ubuntu 22.04 / 24.04 LTS
# =============================================================================

set -e  # Exit immediately on any error

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔══════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Capital Consultancy AG — VPS Setup Script      ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════╝${NC}"

# Root check
if [[ $EUID -ne 0 ]]; then
    echo -e "${RED}✗ This script must be run as root (use: sudo bash setup-docker.sh)${NC}"
    exit 1
fi

# ============================================================================
# [1/6] System Update
# ============================================================================
echo -e "\n${YELLOW}[1/6] Updating system packages...${NC}"
apt update && apt upgrade -y
echo -e "${GREEN}✓ System updated${NC}"

# ============================================================================
# [2/6] Install Docker
# ============================================================================
echo -e "\n${YELLOW}[2/6] Installing Docker...${NC}"

if command -v docker &>/dev/null; then
    echo -e "${GREEN}✓ Docker already installed ($(docker --version))${NC}"
else
    # Remove any legacy packages
    apt remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true

    apt install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release

    # Add Docker's official GPG key
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

    # Add Docker repository
    echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

    apt update
    apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    systemctl enable docker
    systemctl start docker

    echo -e "${GREEN}✓ Docker installed ($(docker --version))${NC}"
fi

# ============================================================================
# [3/6] Install Docker Compose
# ============================================================================
echo -e "\n${YELLOW}[3/6] Installing Docker Compose...${NC}"

if command -v docker-compose &>/dev/null; then
    echo -e "${GREEN}✓ Docker Compose already installed ($(docker-compose --version))${NC}"
else
    COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep '"tag_name"' | cut -d'"' -f4)
    curl -fsSL "https://github.com/docker/compose/releases/download/${COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" \
        -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    echo -e "${GREEN}✓ Docker Compose installed ($(docker-compose --version))${NC}"
fi

# ============================================================================
# [4/6] Install Nginx
# ============================================================================
echo -e "\n${YELLOW}[4/6] Installing Nginx...${NC}"

if command -v nginx &>/dev/null; then
    echo -e "${GREEN}✓ Nginx already installed ($(nginx -v 2>&1))${NC}"
else
    apt install -y nginx
    systemctl enable nginx
    systemctl start nginx
    echo -e "${GREEN}✓ Nginx installed ($(nginx -v 2>&1))${NC}"
fi

# ============================================================================
# [5/6] Install Certbot (Let's Encrypt)
# ============================================================================
echo -e "\n${YELLOW}[5/6] Installing Certbot...${NC}"

if command -v certbot &>/dev/null; then
    echo -e "${GREEN}✓ Certbot already installed${NC}"
else
    apt install -y certbot python3-certbot-nginx
    echo -e "${GREEN}✓ Certbot installed${NC}"
fi

# ============================================================================
# [6/6] Firewall (UFW)
# ============================================================================
echo -e "\n${YELLOW}[6/6] Configuring firewall (UFW)...${NC}"

if command -v ufw &>/dev/null; then
    ufw allow OpenSSH
    ufw allow 'Nginx Full'  # Opens ports 80 and 443
    ufw --force enable
    echo -e "${GREEN}✓ UFW enabled: SSH, HTTP (80), HTTPS (443) allowed${NC}"
else
    echo -e "${YELLOW}⚠ UFW not found — configure your firewall manually (allow 22, 80, 443)${NC}"
fi

# ============================================================================
# Done
# ============================================================================
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║              Setup complete! ✓                   ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════╝${NC}"
echo ""
echo "Next steps:"
echo "  1. Clone your repository to /var/docker/apps/capital-consultancy/"
echo "  2. Copy deploy/nginx.conf.example → /etc/nginx/sites-available/capital-consultancy.conf"
echo "  3. Replace YOUR_DOMAIN.com in the nginx config with your actual domain"
echo "  4. Run: docker-compose up -d --build"
echo "  5. Enable nginx site and get SSL cert:"
echo "       ln -s /etc/nginx/sites-available/capital-consultancy.conf /etc/nginx/sites-enabled/"
echo "       nginx -t && systemctl reload nginx"
echo "       certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com"
echo ""
