import { PropsWithChildren } from "react";

import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { prisma } from "@/db";

export default async function BankLayout({ children }: PropsWithChildren) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const bank = await prisma.bank.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  if (bank) {
    redirect(bank.id);
  }

  return <>{children}</>;
}
