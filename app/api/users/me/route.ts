import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    console.log('Session data:', session)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    let user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        accounts: true,
        listings: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!user) {
      // Create new user with Google account in a transaction
      user = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            email: session.user.email,
            name: session.user.name,
            image: session.user.image,
          }
        })

        await tx.account.create({
          data: {
            userId: newUser.id,
            type: "oauth",
            provider: "google",
            providerAccountId: session.user.id!,
            access_token: session.accessToken,
            id_token: session.idToken,
            scope: "openid profile email",
            token_type: "Bearer"
          }
        })

        return tx.user.findUnique({
          where: { id: newUser.id },
          include: {
            accounts: true,
            listings: true
          }
        })
      })
    }

    return NextResponse.json(user)

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: "Failed to fetch or create user" },
      { status: 500 }
    )
  }
}