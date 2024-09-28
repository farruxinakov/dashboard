import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

import prisma from "@/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = body;

    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const exist = await prisma.bank.findFirst({
      where: {
        name,
      },
    });

    if (exist) {
      return new NextResponse("Conflict", { status: 409 });
    }

    const bank = await prisma.bank.create({
      data: {
        name,
        userId: session.user.id,
      },
    });

    return NextResponse.json(bank);
  } catch (error) {
    console.log(error);
  }
}
