async function ping_server(): Promise<number> {
  return await fetch("http://localhost:3001/ping", {
    credentials: "include",
  }).then((res) => res.status);
}

export default async function ServerPage() {
  const responseCode = await ping_server();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {responseCode ? `Response Code: ${responseCode}` : "Loading..."}
    </main>
  );
}
