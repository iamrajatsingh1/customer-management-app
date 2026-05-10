package com.customerapp.backend.customer.service;

import com.customerapp.backend.customer.Customer;
import com.customerapp.backend.customer.dto.CreateCustomerRequest;
import com.customerapp.backend.customer.dto.CustomerResponse;
import com.customerapp.backend.customer.mapper.CustomerMapper;
import com.customerapp.backend.customer.repository.CustomerRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    public List<CustomerResponse> getAllCustomers() {
        return CustomerMapper.toResponseList(customerRepository.findAll());
    }

    public CustomerResponse createCustomer(CreateCustomerRequest request) {
        Customer customer = CustomerMapper.toEntity(request);
        Customer savedCustomer = customerRepository.save(customer);
        return CustomerMapper.toResponse(savedCustomer);
    }
}
