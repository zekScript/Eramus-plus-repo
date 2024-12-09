// lib/actions.ts
import prisma from '@/lib/db';

export async function getProfileById(profileId: number) {
  try {
    const profile = await prisma.user.findUnique({
      where: { id: profileId },
    });

    return profile;
  } catch (error) {
    throw new Error('Error fetching profile');
  }
}
