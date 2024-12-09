import prisma from '@/lib/db'

export async function getProfileById(portfolioID: string) {
  try {
    const profile = await prisma.user.findUnique({
      where: { id: parseInt(portfolioID) },
    })
    return profile
  } catch (error) {
    console.error('Error fetching profile:', error)
    throw new Error('Failed to fetch profile')
  }
}
