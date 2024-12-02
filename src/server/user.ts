"use server"
import prisma from '@/lib/db'
import bcrypt from 'bcrypt'
// USER CRUD
type User = {
  name: string
  email: string
  password: string
}
export async function createUser(formData: FormData, user: User) {
  const saltRounds = 10

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  if (!name || !email || !password) {
    return { success: false, message: 'All fields are required.' }
  }
  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) {
    return {
      success: false,
      message: 'An account with this email already exists. Please log in.',
    }
  }

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
    return { success: true, message: 'User created successfully.' }
  } catch (error) {
    return { success: false, message: 'Error creating user.' }
  }
}

export async function updateUser(formData: FormData, id: string) {
  const saltRounds = 10
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })
}

export async function deleteUser(id: string) {
  await prisma.user.delete({
    where: {
      id,
    },
  })
}

export async function loginUser(formData: FormData) {
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()

  if (!email || !password) {
    return {
      success: false,
      message: 'Please provide both email and password.',
    }
  }

  // Find the user in the database
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return { success: false, message: 'Invalid email or password.' }
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return { success: false, message: 'Incorrect password. Please try again.' }
  }

  // Compare passwords
  const isPasswordValidAndMail = await bcrypt.compare(password, user.password)
  if (!isPasswordValidAndMail) {
    return { success: false, message: 'Invalid email or password.' }
  }

  return { success: true, message: 'Login successful!' }
}
// Admin page for users
export async function getCurrentUser() {
  try {
    const user = await prisma.user.findFirst({ where: { role: 'ADMIN' } })
    return user // This will return the first user found with the ADMIN role
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}
