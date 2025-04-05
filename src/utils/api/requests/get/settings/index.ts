import fetches, {
  FetchesRequestConfig,
  FetchesResponse,
} from "@siberiacancode/fetches";

export type GetUserSettingsParams = {
  userId: string;
};

export type GetUserSettingsRequestConfig =
  FetchesRequestConfig<GetUserSettingsParams>;

export const getUserSettings = ({
  config,
  params,
}: GetUserSettingsRequestConfig) =>
  fetches.get<unknown, FetchesResponse<UserSettings>>(
    `${process.env.NEXT_PUBLIC_URL}/api/settings?userId=${params.userId}`,
    config,
  );
