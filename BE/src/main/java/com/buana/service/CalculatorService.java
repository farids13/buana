package com.buana.service;

import org.springframework.stereotype.Service;

import com.buana.dto.calculator.CalculatorRequestDto;

@Service
public class CalculatorService {

    public String process (CalculatorRequestDto req){
        //logic
        if (req.getOperator() == null) throw new NullPointerException("Operator is null");

        System.out.println(req.getOperator().toString());
        if(req.getOperator().equals("+") ){ 
            return String.valueOf(req.getFirstNumber() + req.getSecondNumber());
        }
        else if (req.getOperator().equals("-")){
            return String.valueOf(req.getFirstNumber() - req.getSecondNumber());
        }
        else if(req.getOperator().equals("/")){
            return String.valueOf(req.getFirstNumber() / req.getSecondNumber());
        }
        else if(req.getOperator().equals("*")){
            return String.valueOf(req.getFirstNumber() * req.getSecondNumber());
        }
        else{
            return "Invalid Operator";
        }
    }
    
}
