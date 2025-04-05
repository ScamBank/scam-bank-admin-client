"use client";

import { z } from "zod";
import { formSchema } from "./constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormControl,
  FormDescription,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import { Loader2 } from "lucide-react";
import { postCreateTariff } from "@/utils/api/requests/post";
import { useRouter } from "next/navigation";

type FormValues = z.infer<typeof formSchema>;

export const CreateTariffForm = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      TariffName: "",
      InterestRate: 0,
      MinAmount: 0,
      MaxAmount: 0,
      MaxTerm: 0,
      LatePaymentPenalty: 0,
      GracePeriod: 0,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const response = await postCreateTariff({
      GracePeriod: data.GracePeriod,
      LatePaymentPenalty: data.LatePaymentPenalty,
      InterestRate: data.InterestRate,
      MaxAmount: data.MaxAmount,
      MaxTerm: data.MaxTerm,
      MinAmount: data.MinAmount,
      TariffName: data.TariffName,
    });

    if (response.success) {
      form.reset();
      router.refresh();
    } else {
      alert(response.error.data.error.split(":")[1] ?? response.error.data);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-lg h-fit fixed">
      <CardHeader>
        <CardTitle>Создание кредитного тарифа</CardTitle>
        <CardDescription>
          Заполните данные, чтобы создать новый кредитный тариф.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="TariffName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название тарифа</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите название тарифа" {...field} />
                  </FormControl>
                  <FormDescription>Название кредитного тарифа.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="InterestRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Процентная ставка (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Годовая процентная ставка в процентах.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="LatePaymentPenalty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Штраф за просрочку платежа (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Процент штрафа за просрочку платежей.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="MinAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Минимальная сумма</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>
                      Минимальная сумма кредита.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="MaxAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Максимальная сумма</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>
                      Максимальная сумма кредита.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="MaxTerm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Максимальный срок (месяцы)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>
                      Максимальный срок кредитования в месяцах.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="GracePeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Льготный период (дни)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>
                      Льготный период в несколько дней до применения штрафных
                      санкций.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Создать"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
