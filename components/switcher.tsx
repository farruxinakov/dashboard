"use client";

import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

import { Bank } from "@prisma/client";

import { useBankModal } from "@/store/use-bank-modal";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";

interface SwitcherProps {
  banks: Bank[];
}

const Switcher: React.FC<SwitcherProps> = ({ banks }) => {
  const params = useParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const { onOpen } = useBankModal();

  const currentBank = banks.find((bank) => bank.id === params.bankId);

  return (
    <Popover open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {currentBank?.name}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <Command>
          <CommandInput placeholder="Поиск банка | банков" />
          <CommandList>
            <CommandEmpty>Результаты не найдены.</CommandEmpty>
            <CommandGroup heading={banks.length >= 1 ? "Банк:" : "Банки:"}>
              {banks.map((bank) => (
                <CommandItem
                  key={bank.id}
                  onSelect={() => {
                    setIsOpen(false);

                    router.push(`/${bank.id}`);
                  }}
                >
                  {bank.name}
                  {bank.id === currentBank?.id ? (
                    <Check className="ml-auto h-4 w-4" />
                  ) : null}
                </CommandItem>
              ))}
            </CommandGroup>
            <Separator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setIsOpen(false);

                  onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Создайте новый банк
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Switcher;
