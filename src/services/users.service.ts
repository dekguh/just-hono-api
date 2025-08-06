/* eslint-disable unused-imports/no-unused-vars */
import { supabaseAdmin } from '../config/supabase'
import { UsersSchemaZod } from '../models/users.model'
import { UsersRepository } from '../repository/users.repository'
import { HTTPException } from 'hono/http-exception'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class UsersService {
  private readonly passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  constructor (
    private usersRepository: UsersRepository
  ) {}

  async register (userData: UsersSchemaZod) {
    const isEmailExists = await this.usersRepository.emailExists(userData.email)

    if (isEmailExists) {
      throw new HTTPException(400, {
        message: 'email already exists'
      })
    }

    if (!this.passwordRegex.test(userData.password)) {
      throw new HTTPException(400, {
        message: 'password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
      })
    }

    if (userData.password.length < 8) {
      throw new HTTPException(400, {
        message: 'password must contain at least 8 characters'
      })
    }

    const hashedPassword = await Bun.password.hash(userData.password)

    const userCreated = await this.usersRepository.create({
      ...userData,
      password: hashedPassword
    })

    try {
      await supabaseAdmin.auth.admin.createUser({
        email: userCreated.email,
        password: userCreated.password,
        user_metadata: {
          name: userCreated.name,
          user_id: userCreated.id
        }
      })
    } catch (error) {
      throw new HTTPException(500, {
        message: 'failed to create user in supabase'
      })
    }

    const { password, ...userWithoutPassword } = userCreated

    return userWithoutPassword
  }

  async login (email: string, password: string) {
    const emailExists = await this.usersRepository.emailExists(email)

    if (!emailExists) {
      throw new HTTPException(401, { message: 'invalid email or password' })
    }

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new HTTPException(401, { message: 'invalid email or password' })
    }

    if (!user.isActive) {
      throw new HTTPException(401, { message: 'user is not active, please verify your email' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new HTTPException(401, { message: 'invalid email or password' })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' })
    const { password: _, ...userWithoutPassword } = user

    return {
      user: userWithoutPassword,
      token
    }
  }
}
