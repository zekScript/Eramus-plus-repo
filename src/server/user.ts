'use server'
import prisma from '@/lib/db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Helper function for password hashing
const hashPassword = (password: string) => bcrypt.hash(password, 10)


// Check if user exists by email
const findUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } })

// USER CRUD

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const isLengthValid = password.length >= 8
  const isUppercaseValid = /[A-Z]/.test(password)
  const isNumberValid = /\d/.test(password)
  const isSpecialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (!name || !email || !password)
    return { success: false, message: 'All fields are required.' }

  if (
    !(isLengthValid && isUppercaseValid && isNumberValid && isSpecialCharValid)
  ) {
    return {
      success: false,
      message: 'Password does not meet security requirements.',
    }
  }
  const existingUser = await findUserByEmail(email)
  if (existingUser) return { success: false, message: 'Email already in use.' }

  try {
    const hashedPassword = await hashPassword(password)
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    })
    return { success: true, message: 'User created successfully.' }
  } catch (error) {
    return { success: false, message: 'Error creating user.' }
  }
}

export async function updateUser(formData: FormData, id: number) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const hashedPassword = await hashPassword(password)
    await prisma.user.update({
      where: { id },
      data: { name, email, password: hashedPassword },
    })
    return { success: true, message: 'User updated successfully.' }
  } catch (error) {
    return { success: false, message: 'Error updating user.' }
  }
}

export async function deleteUser(id: number) {
  try {
    await prisma.user.delete({ where: { id } })
    return { success: true, message: 'User deleted successfully.' }
  } catch (error) {
    return { success: false, message: 'Error deleting user.' }
  }
}

export async function loginUser(formData: FormData) {
  const secretToken = process.env.SESSION_SECRET as string
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password)
    return { success: false, message: 'Email and password required.' }

  if (!secretToken) {
    throw new Error(
      'SESSION_SECRET is not defined in the environment variables.'
    )
  }

  const user = await findUserByEmail(email)
  if (!user) return { success: false, message: 'Invalid email or password.' }

  const isValid = await bcrypt.compare(password, user.password)
  const tokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  }

  const token = jwt.sign(tokenPayload, secretToken)

  return isValid
    ? {
        success: true,
        message: `Login successful! Welcome ${tokenPayload.name}`,
        token, 
        user,
      }
    : { success: false, message: 'Incorrect password.' }
}
