export type CreateCustomerInput = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
};

export type CustomerResponse = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  createdAt: string;
};

export type CustomersListResponse = {
  data: CustomerResponse[];
}

export type ApiErrorResponse = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  validationErrors?: Array<{
    field: string;
    message: string;
  }>;
};
