import { defineConfig } from "@hey-api/openapi-ts";

/**
 * @see: https://heyapi.vercel.app/
 */
export default defineConfig({
  // base: "http://localhost:3000",
  client: "@hey-api/client-fetch",
  input: "../backend/openapi-spec.json",
  output: "lib/api",
});
