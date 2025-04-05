"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
} from "@/components/ui";
import { postTakeCredit } from "@/utils/api/requests/post";
import { getCookie } from "@/utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogProps } from "@radix-ui/react-dialog";
import {
  AlertCircle,
  Calendar,
  Clock,
  CreditCard,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface TakeCreditModalProps extends DialogProps {
  onOpenChange: (open: boolean) => void;
  tariff: CreditTariff;
}

export const TakeCreditModal = ({ tariff, ...props }: TakeCreditModalProps) => {
  const formSchema = z.object({
    Amount: z
      .number()
      .min(tariff.MinAmount, `Сумма не может быть меньше ${tariff.MinAmount}`)
      .max(
        tariff.MaxAmount,
        `Максимальная сумма пополнения ${tariff.MaxAmount}`,
      ),
    AutoPay: z.boolean(),
    UserGuid: z.string(),
    TariffGuid: z.string(),
  });
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Amount: tariff.MinAmount,
      AutoPay: false,
      TariffGuid: tariff.TariffGuid,
      UserGuid: "",
    },
  });

  useEffect(() => {
    if (!document) return;
    if (!document.cookie) return;
    form.setValue("UserGuid", getCookie("guid") || "");
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await postTakeCredit({
        params: {
          Amount: data.Amount,
          AutoPay: data.AutoPay,
          TariffGuid: data.TariffGuid,
          UserCreditHistory: 0.99,
          UserGuid: data.UserGuid,
        },
      });
      props.onOpenChange(false);
      router.refresh();
    } catch (e) {
      alert("Что-то пошло не так");
    }
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-5">Запросить кредит</DialogTitle>
          <ul className="space-y-3 mt-5 text-muted-foreground">
            <li className="flex items-center gap-2">
              <CreditCard className="size-4 text-muted-foreground" />
              <span className="text-sm">
                Сумма кредита:{" "}
                <span className="font-semibold">
                  {tariff.MinAmount}₽ - {tariff.MaxAmount}₽
                </span>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Максимальный срок:{" "}
                <span className="font-semibold"> {tariff.MaxTerm} </span> дней
              </span>
            </li>
            <li className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Штраф за просрочку платежа:{" "}
                <span className="font-semibold">
                  {tariff.LatePaymentPenalty}%
                </span>{" "}
                в день
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Льготный период:{" "}
                <span className="font-semibold">{tariff.GracePeriod}</span> дней
              </span>
            </li>
          </ul>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="Amount"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Сумма</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        form.setValue("Amount", Number(e.target.value));
                      }}
                    />
                  </FormControl>
                  <span className="text-sm text-destructive">
                    {fieldState.error?.message}
                  </span>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  props.onOpenChange(false);
                }}
              >
                Отмена
              </Button>
              <Button type="submit" className="w-full">
                {form.formState.isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Запросить"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
