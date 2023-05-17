import { getServerSession } from "next-auth/next"
import prisma from '../../../../lib/prisma'
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function handle(req, res) {
  const { sideA, sideAType, sideB, sideBType, category } = req.body
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({ message: "You must be logged in." })
    return
  }
  const result = await prisma.flashcard.create({
    data: {
      sideA: sideA,
      sideAType: sideAType,
      sideB: sideB,
      sideBType: sideBType,
      category: category,
      creator: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result)
}