import { ping_server } from "../../lib/ping-server";

export default async function ServerPage() {
  const responseCode = await ping_server();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {responseCode ? `Response Code: ${responseCode}` : "Loading..."}
    </main>
  );
}
