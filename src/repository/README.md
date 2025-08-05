# Repository Layer

The `repository` folder contains data access layer implementations that abstract database operations and external service interactions.

## Purpose

The repository pattern provides a clean separation between business logic and data access, making the application more testable and maintainable.

## Structure

```
src/repository/
├── README.md           # This file
├── user.repository.ts  # User data access operations
├── post.repository.ts  # Post data access operations
└── index.ts           # Export all repositories
```

## Example Implementation

### User Repository

```typescript
// src/repository/user.repository.ts
import { db } from '../config/postgres'
import { users } from '../models/user.model'
import { eq } from 'drizzle-orm'
import type { User, NewUser } from '../types/user'

export class UserRepository {
  async findAll(): Promise<User[]> {
    return await db.select().from(users)
  }

  async findById(id: string): Promise<User | null> {
    const result = await db.select().from(users).where(eq(users.id, id))
    return result[0] || null
  }

  async create(userData: NewUser): Promise<User> {
    const result = await db.insert(users).values(userData).returning()
    return result[0]
  }

  async update(id: string, userData: Partial<NewUser>): Promise<User | null> {
    const result = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning()
    return result[0] || null
  }

  async delete(id: string): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id))
    return result.rowCount > 0
  }
}

export const userRepository = new UserRepository()
```

### Repository Index

```typescript
// src/repository/index.ts
export { userRepository } from './user.repository'
export { postRepository } from './post.repository'
```

## Usage in Services

```typescript
// src/services/user.service.ts
import { userRepository } from '../repository'

export class UserService {
  async getAllUsers() {
    return await userRepository.findAll()
  }

  async getUserById(id: string) {
    return await userRepository.findById(id)
  }
}
```

## Best Practices

1. **Single Responsibility**: Each repository handles one entity type
2. **Interface Segregation**: Keep methods focused and specific
3. **Error Handling**: Implement proper error handling for database operations
4. **Type Safety**: Use TypeScript interfaces for all data structures
5. **Testing**: Write unit tests for repository methods
6. **Connection Management**: Use the shared database connection from config

## Database Operations

- **CRUD Operations**: Create, Read, Update, Delete
- **Query Building**: Use Drizzle ORM query builders
- **Transactions**: Implement when multiple operations need to be atomic
- **Pagination**: Handle large datasets with offset/limit
- **Filtering**: Support dynamic filtering and sorting

## External Services

For external API calls, create repository-like classes:

```typescript
// src/repository/external-api.repository.ts
import { hc } from 'hc'

export class ExternalApiRepository {
  private client = hc('https://api.example.com')

  async fetchData(): Promise<any> {
    const response = await this.client.get('/data')
    return response.json()
  }
}
```

## Testing

```typescript
// src/repository/__tests__/user.repository.test.ts
import { userRepository } from '../user.repository'

describe('UserRepository', () => {
  it('should find user by id', async () => {
    const user = await userRepository.findById('user-123')
    expect(user).toBeDefined()
  })
})
```
