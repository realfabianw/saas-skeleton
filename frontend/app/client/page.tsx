"use client";

import { useEffect, useState } from "react";

async function ping_client(): Promise<number> {
  return await fetch("http://localhost:3001/ping", {
    credentials: "include",
  }).then((res) => res.status);
}

export default function ClientPage() {
  const [responseCode, setResponseCode] = useState<number>();
  useEffect(() => {
    async function ping() {
      setResponseCode(await ping_client());
    }
    ping();

    return () => {};
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {responseCode ? `Response Code: ${responseCode}` : "Loading..."}
    </main>
  );
}
