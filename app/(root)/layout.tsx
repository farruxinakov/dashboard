import { redirect } from "next/navigation";

import { PropsWithChildren } from "react";

import { auth } from "@/auth";

import prisma from "@/db";

export default async function SetUpLayout({ children }: PropsWithChildren) {
  const session = await auth();

  if (!session?.user) {
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
