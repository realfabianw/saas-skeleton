import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import Providers from "./_components/layout.providers";
import SiteNavigation from "./_components/site.navigation";
import { SiteFooter } from "./_components/site.footer";
import { ClerkProvider } from "@clerk/nextjs";
import { client, createClient } from "@hey-api/client-fetch";
import { auth } from "@clerk/nextjs/server";

// TODO: It works to create the Client here, but it can't be a good approach. Find a proper way to do it.

createClient({
  baseUrl: "http://localhost:3000",
  credentials: "include",
});

client.interceptors.request.use(async (request, options) => {
  request.headers.set("Authorization", `Bearer ${await auth().getToken()}`);
  return request;
});

const font = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          font.variable
        )}
      >
        <ClerkProvider>
          <Providers>
            <SiteNavigation>
              {children}
              <SiteFooter />
            </SiteNavigation>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
