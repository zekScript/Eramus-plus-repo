'use server'

import prisma from '@/lib/db'
import bcrypt from 'bcrypt'

export async function createUser(formData: FormData) {
  const saltRounds = 10
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  if (!name || !email || !password) {
    return { success: false, message: 'All fields are required.' }
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

// export async function logUser(formData: FormData) {
//   const email = formData.get('email') as string
//   const password = formData.get('password') as string

//   if (!email || !password) {
//     return { success: false, message: 'All fields are required.' }
//   }

//   try {
//     await prisma.user.findUnique({
//       where: {
//         email,
//         password,
//       },
//     })
//     return { success: true, message: 'User created successfully.' }
//   } catch (error) {
//     return {
//       success: false,
//       message:
//         'Error logging in (try to double check if email and password is correct)',
//     }
//   }
// }
