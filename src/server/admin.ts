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

export async function findAllPostsFromDB() {
  try {
    const posts = await prisma.post.findMany()
    return posts
  } catch (err) {
    console.log('Error fetching posts from DB', err)
    return null
  }
}
