import { NextResponse } from "next/server"

import { Prisma } from "@prisma/client";

import prisma from '../../../prisma/client'

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// Fetch All Tweets: GET /api/tweets
export async function GET(request: Request) {
  // Fetch all tweets
  try {
    const data = await prisma.tweet.findMany({
      where: {
        parentId: null,
      },
      include: {
        user: true,
        replies: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(data, {
      status: 200
    })
  } catch(err) {
    return NextResponse.json(
      { error: 'Error has occured whilst loading tweets' },
      { status: 403 }
    )
  }
}

// Create Tweet: POST /api/tweets
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if(!session) {
    return NextResponse.json({ message: "Please sign in" }, { status: 401 })
  }

  let tweetParams = await request.json()

  const content: string = tweetParams.content

  // get user
  const prismaUser = await prisma.user.findUnique({
    where: { email: session?.user?.email || 'Temp' },
  })

  // validate title
  if(content.length > 150) {
    return NextResponse.json({message: 'Please write a shorter post' }, { status: 422 })
  }

  if(!content.length) {
    return NextResponse.json({message: 'Please do not leave this empty' }, { status: 422 })
  }

  // Fetch specific Post
  try {
    const data = await prisma.tweet.create({
      data: {
        content,
        userId: prismaUser.id
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
