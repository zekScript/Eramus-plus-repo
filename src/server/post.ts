'use server'

import prisma from '@/lib/db'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const userID = Number(formData.get('userID'))

  if (!title || !content)
    return { success: false, message: 'All fields are required.' }

  try {
    await prisma.post.create({
      data: {
        title: title as string,
        content: content as string,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
        author: { connect: { id: userID } },
      },
    })
    return { success: true, message: 'Post created successfully.' }
  } catch (error) {
    return {
      success: false,
      message: `Error 404: ${console.error(error)} title: ${title}, content: ${content} userID: ${userID}`,
    }
  }
}

export async function findPostById(id: string) {
  return await prisma.post.findUnique({ where: { id } })
}



export async function getPostById(blogID: string) {
  return await prisma.post.findUnique({
    where: { id: blogID },
  })
}

// export async function getMadeByAuthor(){

//   return await prisma.post.findUnique({
//     where: {

//     },
//   })

// }
