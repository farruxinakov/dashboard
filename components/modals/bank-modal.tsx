"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { useBankModal } from "@/store/use-bank-modal";

import { bankSchema } from "@/schemas/bank-schema";

import Modal from "@/components/custom-ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BankModal = () => {
  const { isOpen, onClose } = useBankModal();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof bankSchema>>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof bankSchema>) => {
    try {
      setIsLoading(true);

      const response = await axios.post("/api/banks", values);

      form.reset();

      onClose();

      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Создайте банк"
      text="Введите название банка ниже, чтобы создать его."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button disabled={isLoading} type="submit">
              Создать
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default BankModal;
