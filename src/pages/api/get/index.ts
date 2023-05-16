import { getServerSession } from "next-auth/next"
import prisma from '../../../../lib/prisma';
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  const { category } = query
  const session = await getServerSession(req, res, authOptions);
  if ( session === null ) {
    return res.status(401).json([])
  }
  const feed = await prisma.flashcard.findMany({
    where: {
      category: String(category),
      creator: session?.user 
    }
  })
  res.status(200).json(feed)
}