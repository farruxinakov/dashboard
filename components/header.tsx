"use client";

import { useState } from "react";

import { Bank } from "@prisma/client";

import Switcher from "@/components/switcher";
import Actions from "@/components/actions";
import Navbar from "@/components/navbar";
import Container from "@/components/custom-ui/container";

interface HeaderProps {
  banks: Bank[];
}

const Header: React.FC<HeaderProps> = ({ banks }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky left-0 top-0 z-50 border-b border-border/40 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center justify-between">
            <Switcher open={isOpen} setIsOpen={setIsOpen} banks={banks} />
            <Actions />
          </div>
          <Navbar />
        </div>
      </Container>
    </header>
  );
};

export default Header;
