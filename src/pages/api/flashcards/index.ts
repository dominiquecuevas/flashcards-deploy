import { getServerSession } from "next-auth/next"
import prisma from "@/../lib/prisma"
import { authOptions, SessionWithCallbacks } from "@/pages/api/auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next/types"

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session: SessionWithCallbacks | null = await getServerSession(req, res, authOptions);
  if ( !session && req.method !== 'GET') {
    return res.status(401).json([])
  }
  if ( req.method === 'GET' ) {
    const { category } = req.query
    const categoryData = await prisma.category.findFirst({
      where: {
        creatorId: session?.userId || process.env.USER_ID,
        name: category
      }
    })
    const feed = await prisma.flashcard.findMany({
      where: {
        creatorId: session?.userId || process.env.USER_ID,
        category: {
          name: category
        }
      }
    })
    res.status(200).json({category: categoryData, flashcards: feed})
  } else if ( req.method === 'POST' ) {
    const { sideA, sideB, category, categoryId } = req.body
    const result = await prisma.flashcard.create({
      data: {
        sideA: sideA,
        sideB: sideB,
        category: {
          connectOrCreate: {
            where: {
              id: categoryId
            },
            create: {
              name: category,
              creator: { connect : { id: session.userId } }
            }
          }
        },
        creator: { connect : { id: session.userId } } 
      },
    })
    res.json(result)
  } else if ( req.method === 'PUT' ) {
    const { selectedRadioId, sideA, sideB } = req.body
    const result = await prisma.flashcard.update({
      where: {
        id: selectedRadioId
      },
      data: {
        sideA: sideA,
        sideB: sideB,
      },
    })
    res.json(result)
  } else if ( req.method === 'DELETE' ) {
  const { ids } = req.query
  const idsArray = ids?.split(',')
  const flashcards = await prisma.flashcard.deleteMany({
    where: {
      id: {in: idsArray},
      AND: {creator: session?.user}
    },
  })
  res.json(flashcards)
  }
}