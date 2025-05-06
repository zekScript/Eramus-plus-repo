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
      message:
        'Unexpected error. We suggest contacting support or refreshing the page and try again' +
        error,
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




export async function likePost(postId: string, userID: number) {
  try{
  await prisma.postActions.create(
    {
      data: {
        postReactedById: postId,
        reactedAuthor: { connect: {id: userID}}
      }
    }
  )
  await prisma.post.update({
    where: { id: postId },
    data: {
      likes: {
        increment: 1,
      },
    },
  })
  }
  catch(err){
    console.error(err)
  }
  
}

export async function dislikePost(postId: string, userID: number) {
  try{
  await prisma.postActions.create(
    {
      data: {
        postReactedById: postId,
        reactedAuthor: { connect: {id: userID}}
      }
    }
  )
  await prisma.post.update({
    where: { id: postId },
    data: {
      dislikes: {
        increment: 1,
      },
    },
  })
  }
  catch(err){
    console.error(err)
  }
}

export async function updatePostVisibillity(
  id: string,
  postVisibillity: string
) {
  try {
    await prisma.post.update({
      where: { id },
      data: {
        postVisibillity: postVisibillity as string,
      },
    })
  } catch (error) {
    console.error('Error updating post visibility:', error)
  }
}

export async function updatePostTag(id: string, postTag: string) {
  try {
    await prisma.post.update({
      where: { id },
      data: {
        badge: postTag as string,
      },
    })
  } catch (error) {
    console.error('Error updating post tag:', error)
  }
}

export async function updatePost(id: string, formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  if (!title || !content)
    return { success: false, message: 'All fields are required.' }

  try {
    await prisma.post.update({
      where: { id },
      data: {
        title: title,
        content: content,
        slug: title.toLowerCase().replace(/\s+/g, '-'),
      },
    })
    return { success: true, message: 'Post updated successfully.' }
  } catch (error) {
    return {
      success: false,
      message: `Error updating post: ${console.error(error)}`,
    }
  }
}

export async function deletePost(id: string) {
  try {
    await prisma.post.delete({ where: { id } })
    return { success: true, message: 'Post deleted successfully.' }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      message: `Error deleting your post`,
    }
  }
}

export async function getAuthorMadeTotalPostAmount(id: number) {
  const postCount = await prisma.post.count({
    where: { authorId: id },
  })
  return postCount
}
