"use server"

import prisma from "@/lib/db"
import { getCurrentUser } from "./currentUser"



export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const userId = 6

  if (!title || !content)
    return { success: false, message: 'All fields are required.' }

  try {
    await prisma.post.create({
      data: { 
            title: title as string,
            content: content as string,
            slug: (title as string).toLowerCase().replace(/\s+/g, "-"),
            author: { connect: { id: 2 }}, // Ensure the current user is connected as the author
             },
    })
    return { success: true, message: 'Post created successfully.' }
  } catch (error) {
    return { success: false, message: `Error: ${console.error(error)} title: ${title} and content: ${content} userid: ${userId}` } 
  }
}