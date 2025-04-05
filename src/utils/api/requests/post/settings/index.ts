import fetches, { FetchesRequestConfig } from "@siberiacancode/fetches";

export type PostSettingsBody = {
  theme: "light" | "dark";
  hideBalance?: boolean;
};

export type PostSettingsParams = {
  userId: string;
};

export type PostSettingsRequestConfig = FetchesRequestConfig<
  PostSettingsBody & PostSettingsParams
>;

export const postUserSettings = ({
  config,
  params,
}: PostSettingsRequestConfig) =>
  fetches.post(
    `${process.env.NEXT_PUBLIC_URL}/api/settings?userId=${params.userId}`,
    { theme: params.theme, hideBalance: params.hideBalance },
    config,
  );
