import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

import prisma from "@/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { bankId: string } },
) {
  try {
    const body = await req.json();
    const { name } = body;

    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const exist = await prisma.bank.findFirst({
      where: {
        name,
      },
    });

    if (exist) {
      return new NextResponse("Conflict", { status: 409 });
    }

    const bank = await prisma.bank.update({
      where: {
        id: params.bankId,
        userId: session.user.id,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(bank);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { bankId: string } },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const bank = await prisma.bank.delete({
      where: {
        id: params.bankId,
        userId: session.user.id,
      },
    });

    return NextResponse.json(bank);
  } catch (error) {
    console.log(error);
  }
}
