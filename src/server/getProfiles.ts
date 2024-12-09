import prisma from '@/lib/db'

export async function getProfiles(portfolioID: number) {
  if (isNaN(portfolioID)) {
    throw new Error('Portfolio ID must be a valid number')
  }

  const profile = await prisma.user.findUnique({
    where: { id: portfolioID },
  })

  if (!profile) {
    throw new Error('Profile not found')
  }

  return profile
}
