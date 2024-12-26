package com.buana.dto.member;

import io.swagger.v3.oas.annotations.media.Schema;

public class ListMemberDto {
    
    @Schema(description = "ID")
    private String id;

    @Schema(description = "Name")
    private String name;

    @Schema(description = "Email")
    private String email;

    @Schema(description = "Phone")
    private String phone;

    @Schema(description = "Position")
    private String position;

    @Schema(description = "Departement")
    private String departement;

    @Schema(description = "Superior")
    private String superior;
}
