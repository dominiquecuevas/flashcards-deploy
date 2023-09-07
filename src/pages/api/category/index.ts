import { getServerSession } from "next-auth/next"
import prisma from "@/../lib/prisma"
import { authOptions, SessionWithCallbacks } from "@/pages/api/auth/[...nextauth]"
import { NextApiRequest, NextApiResponse,  } from "next/types"

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session: SessionWithCallbacks | null = await getServerSession(req, res, authOptions)
  if ( !session?.userId ) {
    return res.status(401).json([])
  }
  if (req.method == 'GET') {
    const { category } = req.query
    const result = await prisma.category.findFirst({
      where: {
        creatorId: session?.userId,
        name: category as string
      }
    })
    res.json(result)
  } else if (req.method == 'POST') {
    const { category } = req.body
    const categoryExists = await prisma.category.findFirst({
      where: {
        creatorId: session.userId,
        name: category
      }
    })
    if ( categoryExists === null ) {
      const result = await prisma.category.create({
        data: {
          name: category,
          creator: { connect : { id: session.userId } }  
        }
      })
      res.json(result)
    } else {
      res.json(categoryExists)
    }
  } else if (req.method == 'PUT') {
    const { category, categoryId } = req.body
    const result = await prisma.category.update({
      where: {
        id: categoryId
      },
      data: {
        name: category
      },
    })
    res.json(result)
  } else if (req.method == 'DELETE') {
    const { categoryId } = req.query
    const result = await prisma.category.delete({
      where: {
        id: categoryId as string
      }
    })
    res.json(result)
  }
}