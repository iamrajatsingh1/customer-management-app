package com.customerapp.backend.customer.controller;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.customerapp.backend.customer.dto.CustomerResponse;
import com.customerapp.backend.customer.service.CustomerService;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@WebMvcTest(CustomerController.class)
class CustomerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private CustomerService customerService;

    @Test
    void getCustomersReturnsMappedResponseList() throws Exception {
        CustomerResponse customer = new CustomerResponse(
                1L,
                "Rajat",
                "Singh",
                LocalDate.of(1990, 1, 15),
                Instant.parse("2026-05-10T12:30:00Z")
        );

        given(customerService.getAllCustomers()).willReturn(List.of(customer));

        mockMvc.perform(get("/api/v1/customers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].firstName").value("Rajat"))
                .andExpect(jsonPath("$[0].lastName").value("Singh"))
                .andExpect(jsonPath("$[0].dateOfBirth").value("1990-01-15"))
                .andExpect(jsonPath("$[0].createdAt").value("2026-05-10T12:30:00Z"));
    }
}
