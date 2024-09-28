"use client";

import { useEffect } from "react";

import { useBankModal } from "@/store/use-bank-modal";

export default function SetUpPage() {
  const { isOpen, onOpen } = useBankModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
