// test-utils.tsx

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

export const createWrapper = (
  queryClient = createTestQueryClient()
) => {
  return ({
    children,
  }: {
    children: React.ReactNode;
  }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export function renderWithProviders(ui: React.ReactElement) {
  return render(ui, {
    wrapper: createWrapper(),
  });
}