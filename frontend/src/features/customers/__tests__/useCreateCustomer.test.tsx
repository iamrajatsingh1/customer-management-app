import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { useCreateCustomer } from "../hooks/useCreateCustomer";
import * as customerApi from "../api";

import type {
  CreateCustomerInput,
  CustomerResponse,
} from "../types";

import {
  createWrapper,
  createTestQueryClient,
} from "../../../test/test-utils";
import { QueryClientProvider } from "@tanstack/react-query";

// Mock the API module
vi.mock("../api");

const mockCustomerInput: CreateCustomerInput = {
  firstName: "Rajat",
  lastName: "Singh",
  dateOfBirth: "1990-01-15",
};

const mockCustomerResponse: CustomerResponse = {
  id: 1,
  firstName: "Rajat",
  lastName: "Singh",
  dateOfBirth: "1990-01-15",
  createdAt: "2024-05-10T10:00:00",
};

describe("useCreateCustomer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a customer successfully", async () => {
    vi.mocked(customerApi.createCustomer)
      .mockResolvedValue(mockCustomerResponse);

    const { result } = renderHook(
      () => useCreateCustomer(),
      {
        wrapper: createWrapper(),
      }
    );

    expect(result.current.isPending).toBe(false);

    result.current.mutate(mockCustomerInput);

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    expect(result.current.data)
      .toEqual(mockCustomerResponse);

    expect(customerApi.createCustomer)
      .toHaveBeenCalledWith(
        mockCustomerInput,
        expect.any(Object)
      );
  });

  it("calls the onSuccess callback when customer is created", async () => {
    vi.mocked(customerApi.createCustomer)
      .mockResolvedValue(mockCustomerResponse);

    const onSuccessMock = vi.fn();

    const { result } = renderHook(
      () => useCreateCustomer(onSuccessMock),
      {
        wrapper: createWrapper(),
      }
    );

    result.current.mutate(mockCustomerInput);

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    expect(onSuccessMock)
      .toHaveBeenCalledWith(mockCustomerResponse);
  });

  it("invalidates customers query on success", async () => {
    vi.mocked(customerApi.createCustomer)
      .mockResolvedValue(mockCustomerResponse);

    const queryClient = createTestQueryClient();

    const invalidateQueriesSpy = vi.spyOn(
      queryClient,
      "invalidateQueries"
    );

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(
      () => useCreateCustomer(),
      { wrapper }
    );

    result.current.mutate(mockCustomerInput);

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    expect(invalidateQueriesSpy)
      .toHaveBeenCalledWith({
        queryKey: ["customers"],
      });
  });

  it("handles creation errors", async () => {
    const errorMessage = "Failed to create customer";

    vi.mocked(customerApi.createCustomer)
      .mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(
      () => useCreateCustomer(),
      {
        wrapper: createWrapper(),
      }
    );

    result.current.mutate(mockCustomerInput);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
  });

  it("sets pending state during mutation", async () => {
    vi.mocked(customerApi.createCustomer)
      .mockImplementationOnce(
        () => new Promise(() => { })
      );

    const { result } = renderHook(
      () => useCreateCustomer(),
      {
        wrapper: createWrapper(),
      }
    );

    result.current.mutate(mockCustomerInput);

    await waitFor(() => {
      expect(result.current.isPending).toBe(true);
    });
  });

  it("does not call onSuccess if callback is not provided", async () => {
    vi.mocked(customerApi.createCustomer)
      .mockResolvedValue(mockCustomerResponse);

    const { result } = renderHook(
      () => useCreateCustomer(),
      {
        wrapper: createWrapper(),
      }
    );

    result.current.mutate(mockCustomerInput);

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    expect(result.current.data)
      .toEqual(mockCustomerResponse);
  });

  it("resets mutation state on success", async () => {
    vi.mocked(customerApi.createCustomer)
      .mockResolvedValue(mockCustomerResponse);

    const { result } = renderHook(
      () => useCreateCustomer(),
      {
        wrapper: createWrapper(),
      }
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
    expect(result.current.isPending).toBe(false);

    result.current.mutate(mockCustomerInput);

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    expect(result.current.data)
      .toEqual(mockCustomerResponse);

    expect(result.current.error).toBeNull();
  });
});