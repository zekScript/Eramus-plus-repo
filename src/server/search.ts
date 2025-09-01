'use server'

import prisma from '@/lib/db'

export async function search(getSearchValue: string) {
  if (!getSearchValue) {
    return {
      success: false,
      message: 'Unfortunately there is no value entered.',
    }
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: getSearchValue, mode: 'insensitive' } },
          { content: { contains: getSearchValue, mode: 'insensitive' } },
          {
            author: { name: { contains: getSearchValue, mode: 'insensitive' } },
          },
        ],
      },
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      take: 20,
    })

    return { success: true, message: 'Query is successful', posts }
  } catch (err) {
    console.error(err)
    return { success: false, message: 'Something went wrong' }
  }
}
