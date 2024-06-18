import { GetServerSideProps } from "next";

async function ping(): Promise<number> {
  try {
    const res = await fetch("http://localhost:3001/ping");
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    return res.status;
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
