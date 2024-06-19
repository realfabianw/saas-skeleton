"use server";

import { appControllerAuthorizedPing, appControllerPing } from "../../lib/api";

export default async function ServerPage() {
  const responseCode = (await appControllerPing()).response.status;
  const authorizedResponseCode = (await appControllerAuthorizedPing()).response
    .status;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {responseCode ? `Response Code: ${responseCode}` : "Loading..."}
      <br />
      {authorizedResponseCode
        ? `Org. Authorized Response Code: ${authorizedResponseCode}`
        : "Loading..."}
    </main>
  );
}
