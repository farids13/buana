package com.buana.dto.error;

import io.swagger.v3.oas.annotations.media.Schema;

public record ApiErrorDto(

    @Schema(description = "Error code", example = "400")
    int errorCode,

    @Schema(description = "Error message", example = "Bad Request")
    String message
    
) {}

