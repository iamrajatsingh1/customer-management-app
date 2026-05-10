package com.customerapp.backend.customer.mapper;

import com.customerapp.backend.customer.Customer;
import com.customerapp.backend.customer.dto.CreateCustomerRequest;
import com.customerapp.backend.customer.dto.CustomerResponse;
import java.util.List;

public final class CustomerMapper {

    private CustomerMapper() {
    }

    public static CustomerResponse toResponse(Customer customer) {
        return new CustomerResponse(
                customer.getId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getDateOfBirth(),
                customer.getCreatedAt()
        );
    }

    public static List<CustomerResponse> toResponseList(List<Customer> customers) {
        return customers.stream()
                .map(CustomerMapper::toResponse)
                .toList();
    }

    public static Customer toEntity(CreateCustomerRequest request) {
        return Customer.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .dateOfBirth(request.dateOfBirth())
                .build();
    }
}
