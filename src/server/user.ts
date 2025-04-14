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
  const name = formData.get('newName') as string
  const textAbout = formData.get('textAbout') as string

  if (textAbout.length > 250) {
    return {
      success: false,
      message: 'Bio is too long, please keep it under 250 characters.',
    }
  }

  try {
    await prisma.user.update({
      where: { id },
      data: { name: name, bio: textAbout },
    })
    return { success: true, message: 'User updated successfully.' }
  } catch (error) {
    return { success: false, message: 'Error updating user.' }
  }
}

export async function updateProfilePrivacy(
  id: number,
  privacySettings: string
) {
  try {
    await prisma.user.update({
      where: { id },
      data: {
        privacyVisibility: privacySettings as string,
      },
    })
  } catch (error) {
    console.error('Error updating post visibility:', error)
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

export async function verifyToken(token: string) {
  const secretToken = process.env.SESSION_SECRET as string
  try {
    return jwt.verify(token, secretToken)
  } catch (error) {
    return null
  }
}

export async function loginUser(formData: FormData) {
  const secretToken = process.env.SESSION_SECRET as string
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password)
    return { success: false, message: 'Email and password required.' }

  const user = await findUserByEmail(email)
  if (!user) return { success: false, message: 'Invalid email or password.' }

  const isValid = await bcrypt.compare(password, user.password)
  const tokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
    followersCount: user.followersCount,
    followingCount: user.followingCount,
    postsCount: user.postsCount,
    profilePic: user.profilePic,
    bio: user.bio,
  }

  const token = jwt.sign(tokenPayload, secretToken, { expiresIn: '62d' })

  return isValid
    ? {
        success: true,
        message: `Login successful! Welcome ${tokenPayload.name}`,
        token,
      }
    : { success: false, message: 'Incorrect password.' }
}

export async function findUserById(id: number) {
  return await prisma.user.findUnique({ where: { id } })
}
