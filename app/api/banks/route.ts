import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

import { prisma } from "@/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name } = body;

    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Неаутентифицированный", { status: 401 });
    }

    const exist = await prisma.bank.findFirst({
      where: {
        name,
      },
    });

    if (exist) {
      return new NextResponse("Конфликт", { status: 409 });
    }

    const bank = await prisma.bank.create({
      data: {
        userId: session.user.id,
        name,
      },
    });

    return NextResponse.json(bank);
  } catch (error) {
    return new NextResponse("Внутренняя ошибка", { status: 500 });
  }
}
