# Types

This directory contains TypeScript type definitions used throughout the application.

## Purpose

The `types` folder centralizes all TypeScript interfaces, types, and type definitions to ensure type safety and consistency across the application.

## Structure

- `index.ts` - Main type exports and common interfaces
- `user.ts` - User-related type definitions
- `api.ts` - API response and request type definitions
- `database.ts` - Database model types (if applicable)

## Usage

```typescript
// Import types from this directory
import { User, ApiResponse } from '../types'

// Use in controllers, services, etc.
const user: User = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe'
}
```

## Best Practices

- Keep types simple and focused
- Use descriptive names for interfaces
- Export all types from `index.ts`
- Document complex types with JSDoc comments
- Use generic types for reusable patterns 