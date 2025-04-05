import { instance } from "@/utils/api/instance";
import { FetchesRequestConfig } from "@siberiacancode/fetches";

export interface OpenAccount1cParams {
  UserGuid: string;
  Currency: Currency;
}

export type OpenAccount1cRequestConfig =
  FetchesRequestConfig<OpenAccount1cParams>;

export const postOpenAccount1c = async ({
  params,
  config,
}: OpenAccount1cRequestConfig) =>
  instance.post(
    "/core1c/kondakov_patterns_core/hs/BankSystem/OpenAnAccount",
    { UserGuid: params.UserGuid, Currency: params.Currency },
    { ...config },
  );
