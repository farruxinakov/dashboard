"use client";

import { useEffect } from "react";

import { useSignInModal } from "@/store/use-sign-in-modal";

export default function AuthPage() {
  const { isOpen, onOpen } = useSignInModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
