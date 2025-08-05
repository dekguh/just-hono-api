# Models

This directory contains data models and database schema definitions.

## Purpose

The `models` folder defines the structure of your data entities, database schemas, and data transfer objects (DTOs) that represent your application's domain.

## Structure

- `index.ts` - Main model exports
- `user.model.ts` - User entity model
- `post.model.ts` - Post/Article model
- `auth.model.ts` - Authentication-related models
- `base.model.ts` - Base model with common fields

## Usage

```typescript
// Import models
import { User, Post } from '../models'

// Use in services and controllers
const user = new User({
  email: 'user@example.com',
  name: 'John Doe'
})
```

## Model Types

### Entity Models
- Define the structure of your main entities
- Include validation rules
- Define relationships between entities

### DTOs (Data Transfer Objects)
- Define data structures for API requests/responses
- Separate internal models from external interfaces
- Ensure type safety in API contracts

### Database Models
- Define database schema mappings
- Include database-specific configurations
- Handle database operations

## Best Practices

- Use clear, descriptive names for models
- Include validation rules in models
- Separate concerns between different model types
- Document model relationships
- Use TypeScript interfaces for type safety
- Keep models focused on single responsibility 