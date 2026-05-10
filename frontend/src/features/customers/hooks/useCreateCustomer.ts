import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer } from "../api";
import { CUSTOMERS_QUERY_KEY } from "../utils/constants";
import type { CreateCustomerInput, CustomerResponse } from "../types";

export function useCreateCustomer(onSuccess?: (customer: CustomerResponse) => void) {
  const queryClient = useQueryClient();

  return useMutation<CustomerResponse, unknown, CreateCustomerInput>({
    mutationFn: createCustomer,
    onSuccess: (createdCustomer) => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
      if (onSuccess) onSuccess(createdCustomer);
    },
  });
}
