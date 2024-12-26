package com.buana.dto.member;

import io.swagger.v3.oas.annotations.media.Schema;

public class UpdateMemberDto {
    public record Request(
        @Schema(description = "Name")
        String name,

        @Schema(description = "Email")
        String email,

        @Schema(description = "Phone")
        String phone,

        @Schema(description = "Position")
        String position,

        @Schema(description = "Departement")
        String departement,

        @Schema(description = "Superior")
        String superior
    ) {}

    public record Response(
        @Schema(description = "ID")
        String id,

        @Schema(description = "Name")
        String name
    ) {}
}
