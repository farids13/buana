package com.buana.dto.member;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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

    @Schema(description = "Image URL")
    String imgUrl;

    @Schema(description = "Departement")
    String departement;

    @Schema(description = "Superior")
    String superior;
}
