import { instance } from "@/utils/api/instance";
import { FetchesRequestConfig } from "@siberiacancode/fetches";

interface TopUpAccountBody {
  AccountGuid: string;
  Amount: number;
  OperationType: "TopUp" | "TakeCredit";
}

type TopUpAccountRequestConfig = FetchesRequestConfig<TopUpAccountBody>;

export const postTopUpAccount = async ({
  params,
  config,
}: TopUpAccountRequestConfig) =>
  instance.post<unknown, ApiResponse<{}>>(
    "/core1c/kondakov_patterns_core/hs/BankSystem/TopUpAccount",
    {
      AccountGuid: params.AccountGuid,
      Amount: params.Amount,
      OperationType: params.OperationType,
    },
    { ...config },
  );
