"use server";

import { auth } from "@clerk/nextjs/server";

async function ping_server(): Promise<number> {
  const { getToken } = auth();
  return await fetch("http://localhost:3000/ping", {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  }).then((res) => {
    console.log(res);
    return res.status;
  });
}

async function ping_server_authorized(): Promise<number> {
  const { getToken } = auth();
  return await fetch("http://localhost:3000/ping-authorized", {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  }).then((res) => {
    console.log(res);
    return res.status;
  });
}

export default async function ServerPage() {
  const responseCode = await ping_server();
  const authorizedResponseCode = await ping_server_authorized();
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
