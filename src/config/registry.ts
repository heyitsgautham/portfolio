import { env } from "./env";

export const registryConfig = {
  /** Used to replace the <registryBaseUrl> placeholder in dependency paths */
  baseUrl: env.REGISTRY_URL,
};
