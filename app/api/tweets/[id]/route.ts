import { NextResponse } from "next/server"

import { Prisma } from "@prisma/client";
import prisma from '../../../../prisma/client'

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// Fetch specific Post /api/tweets/123abc
export async function GET(request: Request, { params }) {
  try {
    const data = await prisma.tweet.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: true,
        replies: {
          orderBy: {
            createdAt: 'desc'
          },
          include: {
            user: true,
            replies: true
          }
        }
      }
    })

    return NextResponse.json(data, {
      status: 200
    })
  } catch(err) {
    return NextResponse.json(
      { error: 'Error has occured whilst loading tweet' },
      { status: 403 }
    )
  }
}

export async function DELETE(request: Request, { params }) {
  const session = await getServerSession(authOptions)

  if(!session) {
    return NextResponse.json({ message: "Please sign in" }, { status: 401 })
  }

  // todo ensure user created the post

  // Fetch specific Post
  try {
    const postId = params.id
    const data = await prisma.tweet.delete({
      where: {
        id: postId,
      }
    })

    return NextResponse.json(data, {
      status: 200
    })
  } catch(err) {
    return NextResponse.json(
      { error: 'Error has occured whilst deleting a tweet' },
      { status: 403 }
    )
  }
}
