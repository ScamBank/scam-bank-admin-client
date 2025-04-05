import { instance } from "@/utils/api/instance";
import { FetchesRequestConfig } from "@siberiacancode/fetches";

export const getUsers = async ({ config }: FetchesRequestConfig) =>
  instance.get<unknown, ApiResponse<User[]>>(
    "/users1c/kondakov_patterns_userinfo/hs/BankSystem/ViewUsersInfo",
    { ...config },
  );
