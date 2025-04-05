import { instance } from "@/utils/api/instance";
import { FetchesRequestConfig } from "@siberiacancode/fetches";

type DrawAccountBody = {
  AccountGuid: string;
  Amount: number;
} & (
  | { OperationType: "Withdraw" | "PayOffCredit" }
  | { OperationType: "Transfer"; ReplenishmentAccount: string }
);

type DrawAccountRequestConfig = FetchesRequestConfig<DrawAccountBody>;

export const postDrawAccount = async ({
  params,
  config,
}: DrawAccountRequestConfig) =>
  instance.post<unknown, ApiResponse<{}>>(
    "/core1c/kondakov_patterns_core/hs/BankSystem/WithdrawMoney",
    {
      AccountGuid: params.AccountGuid,
      Amount: params.Amount,
      OperationType: params.OperationType,
      ...(params.OperationType === "Transfer" && {
        ReplenishmentAccount: params.ReplenishmentAccount,
      }),
    },
    { ...config },
  );
