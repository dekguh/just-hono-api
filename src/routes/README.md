# Routes

This directory contains route definitions and API endpoint configurations.

## Purpose

The `routes` folder organizes API endpoints by feature or resource. Each route file defines the HTTP methods, paths, middleware, and handlers for a specific part of your API.

## Structure

- `index.ts` - Main route exports and route registration
- `auth.routes.ts` - Authentication endpoints (login, register, etc.)
- `user.routes.ts` - User management endpoints
- `post.routes.ts` - Post/Article endpoints
- `admin.routes.ts` - Admin-only endpoints
- `health.routes.ts` - Health check and monitoring endpoints

## Usage

```typescript
// Import routes
import { authRoutes, userRoutes } from '../routes'

// Register routes in main app
app.route('/auth', authRoutes)
app.route('/users', userRoutes)
```

## Route Organization

### Feature-Based Routes
- Group related endpoints together
- Use descriptive route prefixes
- Implement proper HTTP methods (GET, POST, PUT, DELETE)

### Route Structure
```typescript
// Example route file structure
const auth = new Hono()

auth.post('/sign-in', signInValidator, authController.signIn)
auth.post('/sign-up', signUpValidator, authController.signUp)
auth.post('/refresh', refreshValidator, authController.refreshToken)
auth.post('/logout', authMiddleware, authController.logout)

export { auth as authRoutes }
```

### HTTP Methods
- `GET` - Retrieve data
- `POST` - Create new resources
- `PUT` - Update entire resources
- `PATCH` - Partial updates
- `DELETE` - Remove resources

## Best Practices

- Use RESTful naming conventions
- Implement proper HTTP status codes
- Add validation middleware to routes
- Document API endpoints
- Use consistent route prefixes
- Implement proper error handling
- Keep routes thin - delegate to controllers 