"use client";

import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

import { Bank } from "@prisma/client";

import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

import { settingsSchema } from "@/schemas/settings-schema";

import AlertModal from "@/components/modals/alert-modal";
import { Heading } from "@/components/custom-ui/heading";
import { Paragraph } from "@/components/custom-ui/paragraph";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SettingsFormProps {
  initialData: Bank;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values: z.infer<typeof settingsSchema>) => {
    try {
      setIsLoading(true);

      await axios.patch(`/api/banks/${params.bankId}`, values);

      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onConfirm = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/banks/${params.bankId}`);

      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={() => onConfirm()}
      />
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <Heading size="h3">Настройки</Heading>
            <Paragraph className="text-muted-foreground">
              Измените свои предпочтения в банке.
            </Paragraph>
          </div>
          <Button
            onClick={() => setIsOpen(true)}
            variant="destructive"
            size="icon"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Новое название вашего банка:</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button disabled={isLoading}>Изменить</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SettingsForm;
