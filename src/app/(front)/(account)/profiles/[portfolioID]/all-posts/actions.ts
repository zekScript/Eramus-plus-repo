'use server'

import prisma from '@/lib/db'

export async function getPostsMadeByYou() {
  return await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })
}
