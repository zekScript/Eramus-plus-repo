'use server'

import prisma from '@/lib/db'
import bcrypt from 'bcrypt'

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
  
  if (!(isLengthValid && isUppercaseValid && isNumberValid && isSpecialCharValid)) {
    return { success: false, message: 'Password does not meet security requirements.' }
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

export async function updateUser(formData: FormData, id: string) {
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

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({ where: { id } })
    return { success: true, message: 'User deleted successfully.' }
  } catch (error) {
    return { success: false, message: 'Error deleting user.' }
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password)
    return { success: false, message: 'Email and password required.' }

  const user = await findUserByEmail(email)
  if (!user) return { success: false, message: 'Invalid email or password.' }

  const isValid = await bcrypt.compare(password, user.password)
  return isValid
    ? { success: true, message: 'Login successful!' }
    : { success: false, message: 'Incorrect password.' }
}

export async function getCurrentUser() {
  return await prisma.user.findFirst({ where: { role: 'ADMIN' } })
}
