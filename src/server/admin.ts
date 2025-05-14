'use server'

import prisma from '@/lib/db'

export async function findAllUsersFromDB() {
  try {
    const users = await prisma.user.findMany()
    return users
  } catch (err) {
    console.log('Error fetching users from DB', err)
    return null
  }
}
