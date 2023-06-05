import { getServerSession } from "next-auth/next"
import prisma from '../../../../lib/prisma'
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export default async function handle(req, res) {
  // const query = req.query
  // const { selectedRadioId } = query
  // console.log('selectedRadioId', selectedRadioId)
  const { selectedRadioId, sideA, sideB } = req.body
  console.log(selectedRadioId, sideA, sideB)
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({ message: "You must be logged in." })
    return
  }
  const result = await prisma.flashcard.update({
    where: {
      id: selectedRadioId
    },
    data: {
      sideA: sideA,
      sideB: sideB,
    },
  });
  res.json(result)
}