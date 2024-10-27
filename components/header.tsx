"use client";

import { useState } from "react";

import { Bank } from "@prisma/client";

import Switcher from "@/components/switcher";
import Actions from "@/components/actions";
import Navbar from "@/components/navbar";
import Container from "@/components/ui/container";

interface HeaderProps {
  banks: Bank[];
}

const Header: React.FC<HeaderProps> = ({ banks }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky py-4 border-b top-0 z-50 left-0 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Switcher isOpen={isOpen} setIsOpen={setIsOpen} banks={banks} />
            <Actions />
          </div>
          <Navbar />
        </div>
      </Container>
    </header>
  );
};

export default Header;
