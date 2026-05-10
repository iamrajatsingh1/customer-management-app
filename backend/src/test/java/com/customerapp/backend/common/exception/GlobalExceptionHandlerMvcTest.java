package com.customerapp.backend.common.exception;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import jakarta.validation.constraints.Size;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = GlobalExceptionHandlerMvcTest.ValidationTestController.class)
@Import(GlobalExceptionHandler.class)
class GlobalExceptionHandlerMvcTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void validationFailureReturnsStructuredApiError() throws Exception {
        mockMvc.perform(get("/api/v1/test-validation").param("name", "a"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.timestamp").exists())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.error").value("Bad Request"))
                .andExpect(jsonPath("$.message").value("Validation failed"))
                .andExpect(jsonPath("$.path").value("/api/v1/test-validation"))
                .andExpect(jsonPath("$.validationErrors").isArray())
                .andExpect(jsonPath("$.validationErrors[0].field").exists())
                .andExpect(jsonPath("$.validationErrors[0].message").exists());
    }

    @TestConfiguration
    static class ValidationTestController {

        @RestController
        @Validated
        static class Endpoint {

            @GetMapping("/api/v1/test-validation")
            String validate(@RequestParam @Size(min = 2, max = 20) String name) {
                return name;
            }
        }
    }
}
