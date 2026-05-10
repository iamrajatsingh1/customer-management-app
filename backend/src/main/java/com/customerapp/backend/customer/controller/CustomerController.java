package com.customerapp.backend.customer.controller;

import com.customerapp.backend.customer.dto.CustomerResponse;
import com.customerapp.backend.customer.service.CustomerService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping
    public List<CustomerResponse> getCustomers() {
        return customerService.getAllCustomers();
    }
}
