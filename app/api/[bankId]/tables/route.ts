import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

import prisma from "@/db";

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
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const bankByUserId = await prisma.bank.findFirst({
      where: {
        id: params.bankId,
        userId: session.user.id,
      },
    });

    if (!bankByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const exist = await prisma.table.findFirst({
      where: {
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
      },
    });

    if (exist) {
      return new NextResponse("Conflict", { status: 409 });
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
    console.log(error);
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { bankId: string } },
) {
  try {
    const tables = await prisma.table.findMany({
      where: {
        bankId: params.bankId,
      },
    });

    return NextResponse.json(tables);
  } catch (error) {
    console.log(error);
  }
}
