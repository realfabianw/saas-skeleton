"use client";

import { ThemeProvider } from "next-themes";
import React from "react";
import { Toaster } from "../../components/ui/sonner";
import { useAuth } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { client } from "../../lib/api";

// Create a client
const queryClient = new QueryClient();

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getToken } = useAuth();

  client.setConfig({
    baseUrl: "http://localhost:3000",
  });

  client.interceptors.request.use(async (request, options) => {
    request.headers.set("Authorization", `Bearer ${await getToken()}`);
    return request;
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
