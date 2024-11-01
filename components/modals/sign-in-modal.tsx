"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useSignInModal } from "@/store/use-sign-in-modal";

import { signInSchema } from "@/schemas/sign-in-schema";

import Modal from "@/components/ui/modal";
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

const SignInModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isOpen, onClose } = useSignInModal();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    setIsLoading(true);

    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    setIsLoading(false);

    form.reset();

    if (response?.error) {
      setError("Неверное имя или пароль.");
    } else {
      setError(null);

      window.location.reload();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Войти в аккаунт"
      description="Введите свое имя и пароль ниже, чтобы войти в свой аккаунт."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {error}
            </p>
          )}
          <div className="flex justify-end">
            <Button disabled={isLoading} type="submit">
              Подтвердить
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default SignInModal;
