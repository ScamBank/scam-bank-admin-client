import { instance } from "@/utils/api/instance";
import { FetchesRequestConfig } from "@siberiacancode/fetches";

interface GetAccountInfoParams {
  AccountGuid: string;
}

type GetAccountInfoRequestConfig = FetchesRequestConfig<GetAccountInfoParams>;

export const getAccountInfo = async ({
  params,
  config,
}: GetAccountInfoRequestConfig) =>
  instance.get<unknown, ApiResponse<AccountInfo>>(
    "/core1c/kondakov_patterns_core/hs/BankSystem/ViewAccountInfo",
    {
      params: { AccountGuid: params.AccountGuid },
      ...config,
    },
  );
