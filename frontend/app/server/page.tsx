"use server";

import { auth } from "@clerk/nextjs/server";

async function ping_server(): Promise<number> {
  const { getToken } = auth();
  return await fetch("http://localhost:3001/ping", {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
    // credentials: "include",
  }).then((res) => {
    console.log(res);
    return res.status;
  });
}

export default async function ServerPage() {
  const responseCode = await ping_server();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {responseCode ? `Response Code: ${responseCode}` : "Loading..."}
    </main>
  );
}