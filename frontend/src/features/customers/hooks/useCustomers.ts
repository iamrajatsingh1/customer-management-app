import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../api";
import { CUSTOMERS_QUERY_KEY } from "../utils/constants";
import type { CustomersListResponse } from "../types";

export function useCustomers() {
  return useQuery<CustomersListResponse>({
    queryKey: CUSTOMERS_QUERY_KEY,
    queryFn: async () => {
      return getCustomers();
    },
  });
}
