"use server"
import prisma from "@/lib/db"
// Search server



export async function search(getSearchValue: string){

      if(!getSearchValue){
            return { success: false, message: 'Unfortunately there is no value entered.' }
      }

      try {
            await prisma.post.findMany({
              where: {
                OR: [
                  {
                    title: {
                      contains: getSearchValue,
                      mode: 'insensitive',
                    },
                  },
                  {
                    content: {
                      contains: getSearchValue,
                      mode: 'insensitive',
                    },
                  },
                  {
                    author: {
                      name: {
                        contains: getSearchValue,
                        mode: 'insensitive',
                      },
                    },
                  },
                ],
              },
              include: {
                author: {
                  select: { name: true },
                },
              },
              orderBy: {
                createdAt: 'desc', // You can also use `updatedAt`
              },
              take: 20, // Limit for performance
            });
            return { success: true, message: 'Query is successful' }
        
          } catch (err) {
            console.error(err);
          }

}