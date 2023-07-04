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
    const result = await prisma.category.findMany({
      where: {
        creatorId: session?.userId
      }
    })
    res.status(200).json(result)
  }
}