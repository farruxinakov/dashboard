import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

import { prisma } from "@/db";

export async function POST(
  req: NextRequest,
  { params }: { params: { bankId: string } },
) {
  try {
    const body = await req.json();

    const {
      group,
      performer,
      partnerName,
      partnerContact,
      request,
      response,
      requestSolutionDate,
      solvingRequestInDays,
      feedback,
      source,
      requestStatus,
      requestCreatedAt,
    } = body;

    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Неаутентифицированный", { status: 401 });
    }

    const bankByUserId = await prisma.bank.findFirst({
      where: {
        id: params.bankId,
        userId: session.user.id,
      },
    });

    if (!bankByUserId) {
      return new NextResponse("Несанкционированный", { status: 403 });
    }

    const exist = await prisma.table.findFirst({
      where: {
        group,
        performer,
        partnerName,
        partnerContact,
        request,
        response,
        solvingRequestInDays,
        feedback,
        source,
        requestStatus,
      },
    });

    if (exist) {
      return new NextResponse("Конфликт", { status: 409 });
    }

    const table = await prisma.table.create({
      data: {
        bankId: params.bankId,
        performer,
        group,
        partnerName,
        partnerContact,
        request,
        response,
        requestSolutionDate,
        solvingRequestInDays,
        feedback,
        source,
        requestStatus,
        requestCreatedAt,
      },
    });

    return NextResponse.json(table);
  } catch (error) {
    return new NextResponse("Внутренняя ошибка", { status: 500 });
  }
}
