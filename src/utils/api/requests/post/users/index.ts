import { instance } from "@/utils/api/instance";

export type PostCreateUserParams = CreateUserDto & {
  Login: string;
  Password: string;
};

export const postCreateUser = async (body: PostCreateUserParams) =>
  instance.post<unknown, ApiResponse<{ UserGuid: UserGuid }>>(
    "/users1c/kondakov_patterns_userinfo/hs/BankSystem/CreateUser",
    body,
  );
