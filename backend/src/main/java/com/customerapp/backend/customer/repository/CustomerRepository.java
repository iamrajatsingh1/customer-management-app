package com.customerapp.backend.customer.repository;

import com.customerapp.backend.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
