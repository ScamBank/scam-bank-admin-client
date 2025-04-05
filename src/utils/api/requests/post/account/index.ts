import { instance } from "@/utils/api/instance";
import { FetchesRequestConfig } from "@siberiacancode/fetches";

interface PostAccountCreateRequestParams {
  UserGuid: string;
}

type PostAccountCreateRequestConfig =
  FetchesRequestConfig<PostAccountCreateRequestParams>;

export const postUserAccountCreate = async ({
  params,
  config,
}: PostAccountCreateRequestConfig) =>
  instance.post<unknown, ApiResponse<{}>>(
    "/core1c/kondakov_patterns_core/hs/BankSystem/OpenAnAccount",
    { UserGuid: params.UserGuid },
    { ...config },
  );
