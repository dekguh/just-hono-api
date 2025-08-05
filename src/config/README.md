# Config

This directory contains application configuration files and environment-specific settings.

## Purpose

The `config` folder manages all configuration settings, environment variables, and application constants to keep configuration centralized and maintainable.

## Structure

- `index.ts` - Main configuration exports
- `database.ts` - Database connection and configuration
- `app.ts` - Application-specific configuration
- `auth.ts` - Authentication configuration (JWT, OAuth, etc.)

## Usage

```typescript
// Import configuration
import { APP_CONFIG, DATABASE_CONFIG } from '../config'

// Use in application
const port = APP_CONFIG.port
const dbUrl = DATABASE_CONFIG.url
```

## Environment Variables

Configuration should support different environments:
- Development
- Staging
- Production

## Best Practices

- Use environment variables for sensitive data
- Provide default values for development
- Validate configuration on startup
- Keep configuration type-safe
- Document all configuration options 