import { instance } from "@/utils/api/instance";
import { FetchesRequestConfig } from "@siberiacancode/fetches";

interface GetUserCreditsParams {
  UserGuid: string;
}

type GetUserCreditsRequestConfig = FetchesRequestConfig<GetUserCreditsParams>;

export const getUserCredits = ({
  params,
  config,
}: GetUserCreditsRequestConfig) =>
  instance.get<unknown, ApiResponse<Credit[]>>(
    "/credit1c/kondakov_patterns_credit/hs/BankSystem/GetUserCredits",
    { params: { UserGuid: params.UserGuid }, ...config },
  );
