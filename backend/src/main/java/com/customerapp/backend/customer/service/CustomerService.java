package com.customerapp.backend.customer.service;

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
}
