import { instance } from "@/utils/api/instance";
import { FetchesRequestConfig } from "@siberiacancode/fetches";

export const getCreditTariffs = ({ config }: FetchesRequestConfig) =>
  instance.get<unknown, ApiResponse<CreditTariff[]>>(
    "/credit1c/kondakov_patterns_credit/hs/BankSystem/GetTariffs",
    {
      ...config,
    },
  );
