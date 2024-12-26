package com.buana.dto.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import io.swagger.v3.oas.annotations.media.Schema;

public record RegisterDto(
    
    @NotBlank
    @Schema(description = "Name of the user", example = "John Doe")
    String name,

    @NotBlank
    @Schema(description = "Email of the user", example = "john.doe@example.com")
    String email,
    
    @NotBlank
    @Schema(description = "Password of the user", example = "password123")
    @Size(min = 8, max = 16, message = "Password must be between 8 and 16 characters")
    String password
) {
    
}
