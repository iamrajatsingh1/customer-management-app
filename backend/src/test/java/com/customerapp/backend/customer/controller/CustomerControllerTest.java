package com.customerapp.backend.customer.controller;

import static org.mockito.BDDMockito.given;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.customerapp.backend.customer.dto.CreateCustomerRequest;
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

    @Test
    void createCustomerReturnsCreatedCustomer() throws Exception {
        CustomerResponse createdCustomer = new CustomerResponse(
                2L,
                "Aditi",
                "Sharma",
                LocalDate.of(1995, 6, 12),
                Instant.parse("2026-05-10T12:31:00Z")
        );

        given(customerService.createCustomer(any(CreateCustomerRequest.class))).willReturn(createdCustomer);

        String requestBody = """
                {
                  "firstName": "Aditi",
                  "lastName": "Sharma",
                  "dateOfBirth": "1995-06-12"
                }
                """;

        mockMvc.perform(post("/api/v1/customers")
                        .contentType("application/json")
                        .content(requestBody))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.firstName").value("Aditi"))
                .andExpect(jsonPath("$.lastName").value("Sharma"))
                .andExpect(jsonPath("$.dateOfBirth").value("1995-06-12"))
                .andExpect(jsonPath("$.createdAt").value("2026-05-10T12:31:00Z"));
    }

    @Test
    void createCustomerWithInvalidPayloadReturnsValidationErrorSchema() throws Exception {
        String invalidRequestBody = """
                {
                  "firstName": "",
                  "lastName": "Sharma",
                  "dateOfBirth": "1995-06-12"
                }
                """;

        mockMvc.perform(post("/api/v1/customers")
                        .contentType("application/json")
                        .content(invalidRequestBody))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.timestamp").exists())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.error").value("Bad Request"))
                .andExpect(jsonPath("$.message").value("Validation failed"))
                .andExpect(jsonPath("$.path").value("/api/v1/customers"))
                .andExpect(jsonPath("$.validationErrors").isArray())
                .andExpect(jsonPath("$.validationErrors[0].field").exists())
                .andExpect(jsonPath("$.validationErrors[0].message").exists());
    }
}
