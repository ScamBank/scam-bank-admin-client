import { instance } from "@/utils/api/instance";
import { FetchesRequestConfig } from "@siberiacancode/fetches";

interface PostAuthorizationBody {
  PhoneNumber: string;
}

type PostAuthorizationRequestConfig =
  FetchesRequestConfig<PostAuthorizationBody>;

export const postAuthorization = async ({
  params,
  config,
}: PostAuthorizationRequestConfig) =>
  instance.post<unknown, ApiResponse<{ UserGuid: string }>>(
    "/users1c/kondakov_patterns_userinfo/hs/BankSystem/Authorization",
    { PhoneNumber: params.PhoneNumber },
    { ...config },
  );
