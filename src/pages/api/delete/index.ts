import { getServerSession } from "next-auth/next"
import prisma from '../../../../lib/prisma'
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next"
import { AuthOptions } from "next-auth"

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { ids } = req.query
  const idsArray = ids?.split(',')
  const session = await getServerSession(req, res, authOptions)
  console.log('ids', ids, 'session.user', session?.user)
  if (!session) {
    res.status(401).json({ message: "You must be logged in." })
    return
  }
  prisma.user.findMany()
  if (req.method == 'DELETE') {
    const flashcards = await prisma.flashcard.deleteMany({
      where: {
        id: {in: idsArray},
        AND: {creator: session?.user}
      },
    })
    res.json(flashcards)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}