"use client";  // Ensure it's a Client Component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient()); // Ensures a fresh client per render

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
