import { apiClient } from "../../lib/axios";
import type { CreateCustomerInput, CustomerResponse } from "./customer.types";

export const createCustomer = async (
  payload: CreateCustomerInput,
): Promise<CustomerResponse> => {
  const { data } = await apiClient.post<CustomerResponse>("/customers", payload);
  return data;
};
