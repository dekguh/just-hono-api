# Docker Setup Guide

This guide explains how to use Docker with your Hono API project for development and production environments.

## 🐳 Docker Files Overview

### **Development Environment**
- `Dockerfile.dev` - Development container with hot reload
- `docker-compose.yml` - Development stack with Hono API only

### **Production Environment**
- `Dockerfile` - Production-optimized container
- `docker-compose.prod.yml` - Production stack with Hono API only

## 🚀 Quick Start

### **Development Environment**

```bash
# Start development environment
bun run docker:dev

# Or manually
docker-compose up --build
```

This will start:
- ✅ **Hono API** on `http://localhost:3000`

### **Production Environment**

```bash
# Start production environment
bun run docker:prod

# Or manually
docker-compose -f docker-compose.prod.yml up --build
```

## 📁 File Structure

```
├── Dockerfile              # Production Docker image
├── Dockerfile.dev          # Development Docker image
├── docker-compose.yml      # Development stack
├── docker-compose.prod.yml # Production stack
├── .dockerignore           # Files to exclude from Docker
└── DOCKER_SETUP.md        # This documentation
```

## 🔧 Development Workflow

### **1. Start Development Environment**

```bash
# Start all services
bun run docker:dev

# View logs
docker-compose logs -f api

# Access services
curl http://localhost:3000/
```

### **2. Development Features**

- **Hot Reload** - Code changes automatically restart the server
- **Volume Mounting** - Local files are synced with container
- **Simple Setup** - Only Hono API service
- **Easy Debugging** - Minimal dependencies

### **3. API Access**

```bash
# Test the API
curl http://localhost:3000/

# View API logs
docker-compose logs api
```

## 🏭 Production Deployment

### **1. Start Production Stack**

```bash
# Start production stack
bun run docker:prod
```

### **2. Production Features**

- **Multi-stage builds** for smaller images
- **Non-root user** for security
- **Health checks** for monitoring
- **Simple deployment** - Only API service
- **Easy scaling** - Minimal dependencies

## 🛠️ Docker Commands

### **Development Commands**

```bash
# Start development environment
bun run docker:dev

# Stop all services
bun run docker:down

# Clean up volumes
bun run docker:clean

# View logs
docker-compose logs -f api

# Execute commands in container
docker-compose exec api bun run lint
```

### **Production Commands**

```bash
# Start production environment
bun run docker:prod

# Stop production services
docker-compose -f docker-compose.prod.yml down

# View production logs
docker-compose -f docker-compose.prod.yml logs -f api
```

### **General Docker Commands**

```bash
# Build image
docker build -t hono-api .

# Build development image
docker build -f Dockerfile.dev -t hono-api:dev .

# Run container
docker run -p 3000:3000 hono-api

# View running containers
docker ps

# View container logs
docker logs <container-id>
```

## 🔍 Monitoring & Debugging

### **Health Checks**

The production container includes health checks:

```bash
# Check container health
docker inspect <container-id> | grep Health -A 10

# Manual health check
curl http://localhost:3000/
```

### **Logs**

```bash
# View all logs
docker-compose logs

# Follow logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f api
```

### **Debugging**

```bash
# Access container shell
docker-compose exec api sh

# Check environment variables
docker-compose exec api env

# Test API health
curl http://localhost:3000/
```

## 🔒 Security Considerations

### **Development**
- Uses default passwords for local development
- Exposes all ports for debugging
- Includes development tools

### **Production**
- Non-root user in container
- Minimal base image
- Health checks for monitoring
- Restart policies for reliability

## 📊 Performance Optimization

### **Development**
- Volume mounting for fast file access
- Hot reload for quick development
- Shared network for service communication

### **Production**
- Multi-stage builds for smaller images
- Optimized base images
- Caching layers for faster builds
- Resource limits and monitoring

## 🚨 Troubleshooting

### **Common Issues**

1. **Port already in use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   
   # Stop conflicting service
   docker-compose down
   ```

2. **API connection issues**
   ```bash
   # Check API logs
   docker-compose logs api
   
   # Restart API service
   docker-compose restart api
   ```

3. **Permission issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

4. **Build failures**
   ```bash
   # Clean build cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

## 📈 Scaling

### **Horizontal Scaling**

```bash
# Scale API service
docker-compose up --scale api=3

# Scale with load balancer
docker-compose -f docker-compose.prod.yml up --scale api=3
```

### **Resource Limits**

Add to docker-compose.yml:

```yaml
services:
  api:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

## 🎯 Best Practices

1. **Use specific image tags** instead of `latest`
2. **Set resource limits** for production containers
3. **Use health checks** for monitoring
4. **Implement proper logging** for debugging
5. **Use secrets management** for sensitive data
6. **Regular security updates** for base images
7. **Backup volumes** for persistent data
8. **Monitor resource usage** in production 