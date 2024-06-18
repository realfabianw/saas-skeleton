import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Link href="client">Client Request</Link>
      <Link href="server">Server Request</Link>
    </main>
  );
}
