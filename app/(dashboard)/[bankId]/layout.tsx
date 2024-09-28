import { redirect } from "next/navigation";

import { ReactNode } from "react";

import { auth } from "@/auth";

import prisma from "@/db";

import Header from "@/components/header";
import Main from "@/components/main";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { bankId: string };
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const bank = await prisma.bank.findFirst({
    where: {
      id: params.bankId,
      userId: session.user.id,
    },
  });

  if (!bank) {
    redirect("/");
  }

  const banks = await prisma.bank.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="flex min-h-dvh flex-col">
      <Header banks={banks} />
      <Main>{children}</Main>
    </div>
  );
}
