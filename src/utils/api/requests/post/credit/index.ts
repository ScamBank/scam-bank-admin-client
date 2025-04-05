import { instance } from "@/utils/api/instance";
import { FetchesRequestConfig } from "@siberiacancode/fetches";

interface PostTakeCreditBody {
  UserGuid: string;
  TariffGuid: string;
  UserCreditHistory: number;
  AutoPay: boolean;
  Amount: number;
}

type PostTakeCreditRequestConfig = FetchesRequestConfig<PostTakeCreditBody>;

export const postTakeCredit = ({
  params,
  config,
}: PostTakeCreditRequestConfig) =>
  instance.post<unknown, ApiResponse<{}>>(
    "/credit1c/kondakov_patterns_credit/hs/BankSystem/TakeCredit",
    {
      UserGuid: params.UserGuid,
      TariffGuid: params.TariffGuid,
      UserCreditHistory: params.UserCreditHistory,
      AutoPay: params.AutoPay,
      Amount: params.Amount,
    },
    { ...config },
  );
