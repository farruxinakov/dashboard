"use client";

import { useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { Table } from "@prisma/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { differenceInDays } from "date-fns";
import axios from "axios";

import { tableSchema } from "@/schemas/table-schema";
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
import { DatePicker } from "./date-picker";

interface TableFormProps {
  initialData: Table | null;
}

const TableForm: React.FC<TableFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

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

      router.replace(`/${params.bankId}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
                <FormLabel>Имя партнера</FormLabel>
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
                <FormLabel>Контакт партнера</FormLabel>
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
          <Button disabled={isLoading} type="submit">
            {initialData ? "Сохранить изменения" : "Создать"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TableForm;
