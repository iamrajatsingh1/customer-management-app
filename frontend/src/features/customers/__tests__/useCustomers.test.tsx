import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { useCustomers } from "../hooks/useCustomers";
import * as customerApi from "../api";

import {
  createWrapper,
  createTestQueryClient,
} from "../../../test/test-utils";

// Mock the API module
vi.mock("../api");

const mockCustomers = [
  {
    id: 1,
    firstName: "Rajat",
    lastName: "Singh",
    dateOfBirth: "1990-01-15",
    createdAt: "2024-05-10T10:00:00",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1985-03-20",
    createdAt: "2024-05-10T11:00:00",
  },
];

describe("useCustomers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches customers on mount", async () => {
    vi.mocked(customerApi.getCustomers).mockResolvedValue({
      data: mockCustomers,
    } as any);

    const { result } = renderHook(
      () => useCustomers(),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data?.data)
      .toEqual(mockCustomers);

    expect(customerApi.getCustomers)
      .toHaveBeenCalledTimes(1);
  });

  it("returns loading state initially", () => {
    vi.mocked(customerApi.getCustomers)
      .mockImplementationOnce(
        () => new Promise(() => { })
      );

    const { result } = renderHook(
      () => useCustomers(),
      {
        wrapper: createWrapper(),
      }
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it("handles API errors gracefully", async () => {
    const errorMessage = "Failed to fetch customers";

    vi.mocked(customerApi.getCustomers)
      .mockRejectedValue(
        new Error(errorMessage)
      );

    const { result } = renderHook(
      () => useCustomers(),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
  });

  it("uses correct query key", async () => {
    vi.mocked(customerApi.getCustomers)
      .mockResolvedValue({
        data: mockCustomers,
      } as any);

    const queryClient = createTestQueryClient();

    const { result } = renderHook(
      () => useCustomers(),
      {
        wrapper: createWrapper(queryClient),
      }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Verify the hook uses the correct query key
    const state = queryClient.getQueryState(["customers"]);

    expect(state).toBeDefined();
  });
});