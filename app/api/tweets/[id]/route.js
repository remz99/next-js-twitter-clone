import { NextResponse } from "next/server"

import { Prisma } from "@prisma/client";
import prisma from '../../../../prisma/client'

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// Fetch specific Post /api/tweets/123abc
export async function GET(request, { params }) {
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
      { error: 'Error has occured whilst loading Tweet' },
      { status: 403 }
    )
  }
}

