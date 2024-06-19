import { defineConfig } from "@hey-api/openapi-ts";

/**
 * @see: https://heyapi.vercel.app/
 */
export default defineConfig({
  client: "@hey-api/client-fetch",
  input: "../backend/openapi-spec.json",
  output: "lib/api",
});
