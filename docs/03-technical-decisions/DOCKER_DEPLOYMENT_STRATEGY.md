# Q-Bridge Docker Deployment Strategy

## 🎯 Objective

**Fully Dockerized Application** - Create production-ready Docker images for seamless deployment on Ultahost remote server.

---

## 📦 Docker Architecture

### **Container Structure**

```
┌─────────────────────────────────────────────────────┐
│              Q-Bridge Docker Stack                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ nginx:alpine (Reverse Proxy)                │   │
│  │ - Port: 80, 443                             │   │
│  │ - SSL/TLS (Let's Encrypt)                   │   │
│  │ - Static file serving                       │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ qbridge-frontend:latest                     │   │
│  │ - Next.js 14+ (Node 20-alpine)              │   │
│  │ - Port: 3000                                │   │
│  │ - Production build                          │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ qbridge-backend:latest                      │   │
│  │ - NestJS (Node 20-alpine)                   │   │
│  │ - Port: 4000                                │   │
│  │ - Production build                          │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ postgres:15-alpine                          │   │
│  │ - Port: 5432                                │   │
│  │ - Persistent volume                         │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ redis:7-alpine                              │   │
│  │ - Port: 6379                                │   │
│  │ - Persistent volume                         │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ minio/minio:latest                          │   │
│  │ - Port: 9000, 9001                          │   │
│  │ - Persistent volume                         │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
Q-bridge/
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── ... (Next.js app)
│
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── ... (NestJS app)
│
├── nginx/
│   ├── nginx.conf
│   └── ssl/ (certificates)
│
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env.example
├── .env
└── README.md
```

---

## 🐳 Dockerfile Configurations

### **1. Frontend Dockerfile (Next.js)**

```dockerfile
# frontend/Dockerfile

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_NAME
ARG NEXT_PUBLIC_PRIMARY_COLOR
ARG NEXT_PUBLIC_FONT_FAMILY

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APP_NAME=$NEXT_PUBLIC_APP_NAME
ENV NEXT_PUBLIC_PRIMARY_COLOR=$NEXT_PUBLIC_PRIMARY_COLOR
ENV NEXT_PUBLIC_FONT_FAMILY=$NEXT_PUBLIC_FONT_FAMILY

# Build Next.js app
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built app
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### **2. Backend Dockerfile (NestJS)**

```dockerfile
# backend/Dockerfile

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build NestJS app
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy built app and Prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

USER nestjs

EXPOSE 4000

CMD ["node", "dist/main.js"]
```

### **3. .dockerignore Files**

```bash
# frontend/.dockerignore
node_modules
.next
.git
.env.local
.env.*.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
*.pem
coverage
.vscode
.idea
```

```bash
# backend/.dockerignore
node_modules
dist
.git
.env
.env.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
*.pem
coverage
.vscode
.idea
```

---

## 🔧 Docker Compose Configuration

### **docker-compose.yml (Development)**

```yaml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    depends_on:
      - frontend
      - backend
    networks:
      - qbridge-network
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        NEXT_PUBLIC_API_URL: ${NEXT_PUBLIC_API_URL}
        NEXT_PUBLIC_APP_NAME: ${NEXT_PUBLIC_APP_NAME}
        NEXT_PUBLIC_PRIMARY_COLOR: ${NEXT_PUBLIC_PRIMARY_COLOR}
        NEXT_PUBLIC_FONT_FAMILY: ${NEXT_PUBLIC_FONT_FAMILY}
    image: qbridge-frontend:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - backend
    networks:
      - qbridge-network
    restart: unless-stopped

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    image: qbridge-backend:latest
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - MINIO_ENDPOINT=${MINIO_ENDPOINT}
      - MINIO_ACCESS_KEY=${MINIO_ACCESS_KEY}
      - MINIO_SECRET_KEY=${MINIO_SECRET_KEY}
      - JWT_SECRET=${JWT_SECRET}
      - JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
    depends_on:
      - postgres
      - redis
      - minio
    networks:
      - qbridge-network
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - qbridge-network
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - qbridge-network
    restart: unless-stopped

  minio:
    image: minio/minio:latest
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      - MINIO_ROOT_USER=${MINIO_ROOT_USER}
      - MINIO_ROOT_PASSWORD=${MINIO_ROOT_PASSWORD}
    command: server /data --console-address ":9001"
    volumes:
      - minio_data:/data
    networks:
      - qbridge-network
    restart: unless-stopped

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  minio_data:
    driver: local

networks:
  qbridge-network:
    driver: bridge
```

---

## 🚀 Deployment Workflow

### **Step 1: Build Images**

```bash
# Build all images
docker-compose build

# Or build individually
docker build -t qbridge-frontend:latest ./frontend
docker build -t qbridge-backend:latest ./backend
```

### **Step 2: Tag Images for Registry (Optional)**

```bash
# Tag for Docker Hub or private registry
docker tag qbridge-frontend:latest your-registry/qbridge-frontend:v1.0.0
docker tag qbridge-backend:latest your-registry/qbridge-backend:v1.0.0

# Push to registry
docker push your-registry/qbridge-frontend:v1.0.0
docker push your-registry/qbridge-backend:v1.0.0
```

### **Step 3: Deploy to Ultahost**

```bash
# On Ultahost server

# 1. Clone repository or copy docker-compose files
git clone https://github.com/your-org/qbridge.git
cd qbridge

# 2. Create .env file
cp .env.example .env
nano .env  # Configure environment variables

# 3. Pull images (if using registry)
docker-compose pull

# 4. Start services
docker-compose up -d

# 5. Check status
docker-compose ps

# 6. View logs
docker-compose logs -f
```

### **Step 4: Database Migration**

```bash
# Run Prisma migrations
docker-compose exec backend npx prisma migrate deploy

# Seed database (if needed)
docker-compose exec backend npm run seed
```

---

## 📋 Environment Variables (.env)

```bash
# .env.example

# Application
NODE_ENV=production
APP_NAME=Q-Bridge
APP_URL=https://qbridge.tandabuiinstitute.ac.tz

# Frontend (Next.js)
NEXT_PUBLIC_API_URL=https://qbridge.tandabuiinstitute.ac.tz/api
NEXT_PUBLIC_APP_NAME=Q-Bridge
NEXT_PUBLIC_PRIMARY_COLOR=#14b8a6  # Teal
NEXT_PUBLIC_FONT_FAMILY=Inter,sans-serif

# Backend (NestJS)
PORT=4000
API_PREFIX=api

# Database (PostgreSQL)
DATABASE_URL=postgresql://qbridge_user:secure_password@postgres:5432/qbridge
POSTGRES_DB=qbridge
POSTGRES_USER=qbridge_user
POSTGRES_PASSWORD=secure_password

# Redis
REDIS_URL=redis://redis:6379

# MinIO (S3-compatible storage)
MINIO_ENDPOINT=minio:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin_password
MINIO_BUCKET=qbridge-files
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin_password

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this
JWT_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# Email (Africa's Talking or SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=noreply@tpi.ac.tz
MAIL_PASSWORD=your-email-password
MAIL_FROM=Q-Bridge <noreply@tpi.ac.tz>

# SMS (Africa's Talking)
AFRICAS_TALKING_USERNAME=your-username
AFRICAS_TALKING_API_KEY=your-api-key
AFRICAS_TALKING_SENDER_ID=QBRIDGE

# OpenAI (for AI features)
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4

# Branding (configurable)
BRAND_PRIMARY_COLOR=#14b8a6  # Teal
BRAND_SECONDARY_COLOR=#0f766e
BRAND_FONT_FAMILY=Inter,sans-serif
BRAND_LOGO_URL=https://tandabuionline.ac.tz/logo.png
BRAND_FAVICON_URL=https://tandabuionline.ac.tz/favicon.ico
```

---

## 🔄 Update & Rollback Strategy

### **Update Deployment**

```bash
# 1. Pull latest code
git pull origin main

# 2. Rebuild images
docker-compose build

# 3. Stop and remove old containers
docker-compose down

# 4. Start new containers
docker-compose up -d

# 5. Run migrations
docker-compose exec backend npx prisma migrate deploy
```

### **Rollback**

```bash
# 1. Stop current containers
docker-compose down

# 2. Checkout previous version
git checkout v1.0.0

# 3. Rebuild and start
docker-compose build
docker-compose up -d
```

---

## 📊 Monitoring & Logs

### **View Logs**

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Last 100 lines
docker-compose logs --tail=100 backend
```

### **Container Health**

```bash
# Check running containers
docker-compose ps

# Check resource usage
docker stats

# Inspect container
docker inspect qbridge-backend
```

---

## 🔒 Security Best Practices

1. ✅ **Non-root users** in containers
2. ✅ **Multi-stage builds** to reduce image size
3. ✅ **Alpine Linux** base images (smaller attack surface)
4. ✅ **Environment variables** for secrets (never hardcode)
5. ✅ **Volume persistence** for data
6. ✅ **Network isolation** via Docker networks
7. ✅ **SSL/TLS** via Nginx reverse proxy
8. ✅ **Regular updates** of base images

---

## 📦 Image Size Optimization

### **Current Image Sizes (Estimated)**

```
qbridge-frontend:latest   ~150MB (Alpine + Next.js)
qbridge-backend:latest    ~180MB (Alpine + NestJS + Prisma)
postgres:15-alpine        ~230MB
redis:7-alpine           ~30MB
minio/minio:latest       ~120MB
nginx:alpine             ~25MB
```

**Total:** ~735MB (all images)

---

## ✅ Deployment Checklist

- [ ] Docker and Docker Compose installed on Ultahost server
- [ ] `.env` file configured with production values
- [ ] SSL certificates obtained (Let's Encrypt)
- [ ] Domain DNS configured (qbridge.tandabuiinstitute.ac.tz → server IP)
- [ ] Firewall rules configured (ports 80, 443)
- [ ] Database backups configured
- [ ] Monitoring setup (optional: Prometheus/Grafana)
- [ ] Images built and tested locally
- [ ] docker-compose.yml reviewed
- [ ] Nginx configuration reviewed
- [ ] Environment variables validated
- [ ] Database migrations ready
- [ ] Seed data prepared (if needed)

---

## 🎯 Final Deployment Command

```bash
# One-command deployment
docker-compose up -d --build

# Verify all services are running
docker-compose ps

# Check logs for errors
docker-compose logs -f
```

---

## 📝 Summary

**Q-Bridge is fully Dockerized with:**
- ✅ Multi-stage Docker builds for optimal image size
- ✅ Production-ready docker-compose configuration
- ✅ Environment-based configuration (.env)
- ✅ Persistent volumes for data
- ✅ Network isolation for security
- ✅ Easy deployment workflow
- ✅ Simple update and rollback process
- ✅ Comprehensive logging and monitoring

**Deployment is as simple as:**
```bash
docker-compose up -d
```

**Ready for Ultahost deployment!** 🚀
