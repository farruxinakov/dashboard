"use client";

import { Dispatch, SetStateAction } from "react";

import { useParams, useRouter } from "next/navigation";

import { Bank } from "@prisma/client";

import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

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
  CommandSeparator,
} from "@/components/ui/command";

interface SwitcherProps {
  open: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  banks: Bank[];
}

const Switcher: React.FC<SwitcherProps> = ({ open, setIsOpen, banks }) => {
  const params = useParams();
  const router = useRouter();

  const { onOpen } = useBankModal();

  const currentBank = banks.find((bank) => bank.id === params.bankId);

  return (
    <Popover open={open} onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[12.5rem]">
          <span className="truncate">{currentBank?.name}</span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[12.5rem] p-0">
        <Command>
          <CommandInput placeholder="Поиск банка | банков" />
          <CommandList>
            <CommandEmpty>Результаты не найдены.</CommandEmpty>
            <CommandGroup>
              {banks.map((bank) => (
                <CommandItem
                  key={bank.id}
                  onSelect={() => {
                    setIsOpen(false);

                    router.push(bank.id);
                  }}
                >
                  <span className="truncate">{bank.name}</span>
                  {bank.id === currentBank?.id && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setIsOpen(false);

                  onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Создать новый банк
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Switcher;
