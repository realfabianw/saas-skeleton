"use client";

export async function ping_client(): Promise<number> {
  return await fetch("http://localhost:3001/ping", {
    credentials: "include",
  }).then((res) => res.status);
}
