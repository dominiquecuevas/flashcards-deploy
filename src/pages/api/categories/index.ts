import { getServerSession } from "next-auth/next"
import prisma from "@/../lib/prisma"
import { authOptions, SessionWithCallbacks } from "@/pages/api/auth/[...nextauth]"
import { NextApiRequest, NextApiResponse,  } from "next/types"

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session: SessionWithCallbacks | null = await getServerSession(req, res, authOptions)
  if ( !session && req.method !== 'GET') {
    return res.status(401).json([])
  }
  if (req.method == 'GET') {
    let result
    if (!session) {
      result = await prisma.category.findMany({
        where: {
          creatorId: process.env.USER_ID,
          name: 'French'
        }
      })
    } else {
      result = await prisma.category.findMany({
        where: {
          creatorId: session?.userId
        }
      })
    }
    res.status(200).json(result)
  }

}