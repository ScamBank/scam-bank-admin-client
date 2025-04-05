import { instance } from "@/utils/api/instance";
import { FetchesRequestConfig } from "@siberiacancode/fetches";

export interface GetUserAccountsParams {
  UserGuid: string;
}

export type GetUserAccountsRequestConfig =
  FetchesRequestConfig<GetUserAccountsParams>;

export const getUserAccounts = async ({
  params,
  config,
}: GetUserAccountsRequestConfig) =>
  instance.get<unknown, ApiResponse<Account[]>>(
    "/core1c/kondakov_patterns_core/hs/BankSystem/GetAccountsOfUser",
    {
      params: { UserGuid: params.UserGuid },
      ...config,
    },
  );
