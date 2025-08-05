# Utils

This directory contains utility functions and helper methods used throughout the application.

## Purpose

The `utils` folder provides reusable utility functions, helper methods, and common operations that can be shared across different parts of the application.

## Structure

- `index.ts` - Main utility exports
- `response.ts` - HTTP response helpers
- `error.ts` - Error handling utilities
- `constants.ts` - Application constants
- `validation.ts` - Validation helper functions
- `date.ts` - Date/time utility functions

## Usage

```typescript
// Import utilities
import { successResponse, errorResponse } from '../utils'

// Use in controllers
return successResponse(c, data, 'User created successfully')
return errorResponse(c, 'User not found', 404)
```

## Common Utilities

### Response Helpers
- `successResponse()` - Standard success response format
- `errorResponse()` - Standard error response format
- `paginatedResponse()` - Paginated data response

### Error Handling
- `createError()` - Create custom application errors
- `handleError()` - Centralized error handling

### Validation
- `validateEmail()` - Email validation
- `validatePassword()` - Password strength validation

## Best Practices

- Keep utilities pure and stateless
- Write comprehensive tests for utilities
- Document function parameters and return types
- Use TypeScript for type safety
- Keep utilities focused and single-purpose 