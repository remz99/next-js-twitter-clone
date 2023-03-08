import { NextResponse } from "next/server"

import { Prisma } from "@prisma/client";

import prisma from '../../../../../prisma/client'

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// Create Tweet: POST /api/tweets/123abc/replies
export async function POST(request: Request, { params }) {
  const session = await getServerSession(authOptions)

  if(!session) {
    return NextResponse.json({ message: "Please sign in" }, { status: 401 })
  }

  // get current user
  const prismaUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email
    }
  })

  let replyParams = await request.json()

  const tweetId = params.id
  const content: string = replyParams.data.content

  console.log(tweetId)
  console.log(content)

  // validate title
  if(content.length > 150) {
    return NextResponse.json({message: 'Tweet is too long' }, { status: 422 })
  }

  if(!content.length) {
    return NextResponse.json({message: 'Tweet content is missing' }, { status: 422 })
  }

  // Fetch specific Tweet
  try {
    const data = await prisma.tweet.create({
      data: {
        content: content,
        userId: prismaUser.id,
        parentId: tweetId
      }
    })

    return NextResponse.json({}, {
      status: 200
    })
  } catch(err) {
    return NextResponse.json(
      { error: 'Error has occured whilst creating Tweet' },
      { status: 403 }
    )
  }
}
