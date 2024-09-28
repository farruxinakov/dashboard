"use client";

import { signOut } from "next-auth/react";

import { Bank } from "@prisma/client";

import Switcher from "@/components/switcher";
import Navbar from "@/components/navbar";
import ThemeToggle from "@/components/theme-toggle";
import Container from "@/components/custom-ui/container";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  banks: Bank[];
}

const Header: React.FC<HeaderProps> = ({ banks }) => {
  return (
    <header className="sticky left-0 top-0 z-50 w-full border-b border-border/40 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-8 gap-y-4 md:grid-cols-[auto_1fr_auto]">
          <Switcher banks={banks} />
          <Navbar />
          <div className="flex items-center justify-end gap-x-4 md:justify-start">
            <ThemeToggle />
            <Button onClick={() => signOut()} variant="outline">
              Выйти
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
