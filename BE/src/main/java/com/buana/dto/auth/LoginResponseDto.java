package com.buana.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;

public record LoginResponseDto(
    @Schema(description = "Access token")
    String accessToken, 
    @Schema(description = "Email")
    String email
) {
    
}
