import { apiClient } from "../../../lib/axios";
import type { CreateCustomerInput, CustomerResponse, CustomersListResponse } from "../types";

export const createCustomer = async (
  payload: CreateCustomerInput,
): Promise<CustomerResponse> => {
  const { data } = await apiClient.post<CustomerResponse>("/customers", payload);
  return data;
};

export const getCustomers = async (): Promise<CustomersListResponse> => {
  const { data } = await apiClient.get<CustomersListResponse>("/customers");
  return data;
};