"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const Navbar = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      id: 1,
      label: "Таблицы",
      href: `/${params.bankId}/tables`,
    },
    {
      id: 2,
      label: "Общие Таблицы",
      href: `/${params.bankId}/general`,
    },
    {
      id: 3,
      label: "Параметры",
      href: `/${params.bankId}/settings`,
    },
  ];

  return (
    <nav>
      <ScrollArea className="whitespace-nowrap">
        <ul className="pb-4 sm:pb-0">
          {routes.map(({ id, href, label }) => (
            <li
              key={id}
              className="inline-flex h-9 items-center justify-center whitespace-nowrap px-4 py-2 first:pl-0 last:pr-0"
            >
              <Link
                href={href}
                className={cn(
                  "relative text-sm font-medium before:absolute before:bottom-0 before:left-0 before:-z-10 before:h-px before:w-0 before:translate-y-2 before:bg-primary before:transition-[width] before:duration-300 before:content-[''] hover:before:w-full",
                  href === pathname && "before:w-full",
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </nav>
  );
};

export default Navbar;
