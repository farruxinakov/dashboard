import { PropsWithChildren } from "react";

import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/");
  }

  return <>{children}</>;
}
