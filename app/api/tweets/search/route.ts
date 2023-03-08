import { NextResponse } from "next/server"

import { Prisma } from "@prisma/client";

import prisma from '../../../../prisma/client'

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// Fetch All Tweets: GET /api/tweets
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('query')

  // Fetch all tweets
  try {
    const data = await prisma.tweet.findMany({
      where: {
        content: {
          contains: query
        }
      },
      include: {
        user: true,
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