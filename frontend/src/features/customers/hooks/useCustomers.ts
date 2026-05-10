import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../customer.api";
import { CUSTOMERS_QUERY_KEY } from "../constants";
import type { CustomerResponse } from "../customer.types";

export function useCustomers() {
  return useQuery<CustomerResponse[]>({
    queryKey: CUSTOMERS_QUERY_KEY,
    queryFn: async () => {
      const response = await getCustomers();
      return response.data;
    },
  });
}
