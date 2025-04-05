import { instance } from "@/utils/api/instance";

export const getUsers = async () =>
  instance.get<unknown, ApiResponse<User[]>>(
    "/users1c/kondakov_patterns_userinfo/hs/BankSystem/ViewUsersInfo",
  );
