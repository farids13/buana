package com.buana.dto.member;

import io.swagger.v3.oas.annotations.media.Schema;

public class DetailMemberDto {

    @Schema(description = "ID")
    String id;

    @Schema(description = "Name")
    String name;

    @Schema(description = "Email")
    String email;

    @Schema(description = "Phone")
    String phone;

    @Schema(description = "Position")
    String position;

    @Schema(description = "Departement")
    String superior;
}
