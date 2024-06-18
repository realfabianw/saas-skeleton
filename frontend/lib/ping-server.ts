"use server";

export async function ping_server(): Promise<number> {
  return await fetch("http://localhost:3001/ping", {
    credentials: "include",
  }).then((res) => res.status);
}
