import { bearerAuth } from 'hono/bearer-auth'
import jwt from 'jsonwebtoken'

export const authMiddleware = bearerAuth({
  verifyToken: async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    return Boolean(decoded)
  },
  invalidTokenMessage: () => {
    return 'invalii'
  }
})
