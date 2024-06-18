async function ping(): Promise<number> {
  try {
    return await fetch("http://localhost:3001/ping", {
      credentials: "include", // if this is included, client side requests authenticate. SSR requests don't, as the cookie is not present on the server
    }).then((res) => res.status);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  } catch (err) {
    console.error(err);
    return -1;
  }
}

export default async function Page() {
  const responseCode = await ping();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {responseCode ? `Response Code: ${responseCode}` : "Loading..."}
    </main>
  );
}
