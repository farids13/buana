package com.buana.dto.calculator;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CalculatorRequestDto {
    
    @Schema(description = "nilai pertama", required = true)
    Long firstNumber ;
    @Schema(description = "operator", required = true)
    String operator ; 
    @Schema(description = "nilai kedua")
    Long secondNumber; 

}
