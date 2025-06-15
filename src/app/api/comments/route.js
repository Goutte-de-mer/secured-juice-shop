import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { content, rating, userId, productId } = await request.json();

    const comment = await prisma.comment.create({
      data: {
        content,
        rating,
        userId,
        productId,
      },
      include: {
        user: {
          select: { name: true, lastName: true },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création" },
      { status: 500 },
    );
  }
}
