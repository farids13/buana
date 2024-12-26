package com.buana.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;

public record LoginDto (
    @Schema(description = "Email", example = "john.doe@example.com")
    String email,
    @Schema(description = "Password", example = "password123")
    String password
) {
    
}

