import fetches from "@siberiacancode/fetches";
import { getCookie } from "../helpers";

export const instance = fetches.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  headers: {
    Authorization: typeof window !== "undefined" ? getCookie("token")! : "",
  },
});

instance.interceptors.request.use(
  (config) => {
    console.log("@inter headers", config.headers);
    console.log(
      `${config.method?.toUpperCase()} request on: ${config.url}\nCache: ${config.next?.tags}`,
    );
    return config;
  },
  (error) => error,
);

instance.interceptors.response.use(
  (response) => ({ ...response, success: true }),
  (error) => ({ error: { ...error.response }, success: false }),
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (response) => {
    console.log(`------------------------------------------`);
    console.log(
      `${response.config.method?.toUpperCase()} request on: ${response.config.url} failed`,
    );
    console.log(
      `Error code - ${response.response.status}, ${response.response.data.message}`,
    );
    console.log(`------------------------------------------`);
    return Promise.reject(response);
  },
);
