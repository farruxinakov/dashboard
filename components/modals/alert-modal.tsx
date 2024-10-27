"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/ui/modal";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  disabled: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  disabled,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Вы абсолютно уверены?"
      description="Это действие невозможно отменить. Это приведет к безвозвратному удалению вашего банка и удалению ваших данных с серверов."
    >
      <DialogFooter>
        <Button disabled={disabled} onClick={onClose} variant="outline">
          Отменить
        </Button>
        <Button disabled={disabled} onClick={onConfirm}>
          Подтвердить
        </Button>
      </DialogFooter>
    </Modal>
  );
};

export default AlertModal;
