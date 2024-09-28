"use client";

import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

import { Table } from "@prisma/client";

import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInDays } from "date-fns";
import axios from "axios";

import { tableSchema } from "@/schemas/table-schema";

import AlertModal from "@/components/modals/alert-modal";
import { Heading } from "@/components/custom-ui/heading";
import { Paragraph } from "@/components/custom-ui/paragraph";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DatePicker from "./date-picker";

interface TableFormProps {
  initialData: Table | null;
}

const TableForm: React.FC<TableFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof tableSchema>>({
    resolver: zodResolver(tableSchema),
    defaultValues: initialData || {
      group: "",
      performer: "",
      partnerName: "",
      partnerContact: "",
      request: "",
      response: "",
      requestSolutionDate: new Date(),
      solvingRequestInDays: null,
      feedback: "",
      source: "",
      requestStatus: "",
      requestCreatedAt: new Date(),
    },
  });

  const onSubmit = async (values: z.infer<typeof tableSchema>) => {
    try {
      setIsLoading(true);

      values.solvingRequestInDays = differenceInDays(
        new Date(values.requestSolutionDate),
        new Date(values.requestCreatedAt),
      );

      if (!initialData) {
        await axios.post(`/api/${params.bankId}/tables`, values);
      } else {
        await axios.patch(
          `/api/${params.bankId}/tables/${params.tableId}`,
          values,
        );
      }

      form.reset();

      router.back();
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

      await axios.delete(`/api/${params.bankId}/tables/${params.tableId}`);

      router.back();
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
            <Heading size="h3">
              {initialData ? "Редактировать таблицу" : "Создать таблицу"}
            </Heading>
            <Paragraph className="text-muted-foreground">
              {initialData
                ? "Внесите изменения в таблицу."
                : "Добавьте новую таблицу."}
            </Paragraph>
          </div>
          {initialData && (
            <Button
              onClick={() => setIsOpen(true)}
              variant="destructive"
              size="icon"
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
              <FormField
                control={form.control}
                name="group"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Группа</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="performer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Исполнитель</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="partnerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя партнёра</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="partnerContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Контакт партнёра</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="request"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Запрос</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="response"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ответ на запрос</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requestSolutionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата решение запроса</FormLabel>
                    <FormControl>
                      <DatePicker
                        disabled={isLoading}
                        value={field.value}
                        onSelect={(date) => {
                          if (date) {
                            form.setValue("requestSolutionDate", date);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Книга жалоб</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Источник</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requestStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Статус</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requestCreatedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата создания запроса</FormLabel>
                    <FormControl>
                      <DatePicker
                        disabled={isLoading}
                        value={field.value}
                        onSelect={(date) => {
                          if (date) {
                            form.setValue("requestCreatedAt", date);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button disabled={isLoading}>
                {initialData ? "Сохранить изменения" : "Создать"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default TableForm;
