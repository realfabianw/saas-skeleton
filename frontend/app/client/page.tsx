"use client";

import { useEffect, useState } from "react";

async function ping_client(): Promise<number> {
  return await fetch("http://localhost:3000/ping", {
    credentials: "include",
  }).then((res) => res.status);
}

async function ping_client_authorized(): Promise<number> {
  return await fetch("http://localhost:3000/ping-authorized", {
    credentials: "include",
  }).then((res) => res.status);
}

export default function ClientPage() {
  const [responseCode, setResponseCode] = useState<number>();
  const [authorizedResponseCode, setAuthorizedResponseCode] =
    useState<number>();

  useEffect(() => {
    async function ping() {
      setResponseCode(await ping_client());
      setAuthorizedResponseCode(await ping_client_authorized());
    }
    ping();

    return () => {};
  }, []);

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
