package com.customerapp.backend.customer.dto;

import java.time.Instant;
import java.time.LocalDate;

public record CustomerResponse(
        Long id,
        String firstName,
        String lastName,
        LocalDate dateOfBirth,
        Instant createdAt
) {
}
