package com.buana.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.buana.dto.error.ApiErrorDto;
import com.buana.dto.member.InsertMemberDto;
import com.buana.dto.member.UpdateMemberDto;
import com.buana.dto.pagination.PaginationRequest;
import com.buana.dto.pagination.PaginationResponse;
import com.buana.model.Member;
import com.buana.service.MemberService;

import io.swagger.v3.oas.annotations.*;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

@RestController
@RequestMapping("/api/members")
public class MemberController {
    
    @Autowired
    private MemberService memberService;

    @Operation(summary = "Get all members")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema(implementation = PaginationResponse.class))),
        @ApiResponse(responseCode = "400", description = "Invalid request body", content = @Content(schema = @Schema(implementation = ApiErrorDto.class))),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ApiErrorDto.class)))
    })
    @GetMapping
    public ResponseEntity<PaginationResponse<Member>> getAllMembers(
        @Parameter(hidden = true) @RequestHeader("X-Consumer-Custom-ID") String customId,
        @ModelAttribute PaginationRequest paginationRequest,
        @RequestParam(required = false) String searchTerm
    ) {
        return ResponseEntity.ok(memberService.getAllMembers(paginationRequest, searchTerm));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable String id) {
        return ResponseEntity.ok(memberService.getMemberById(id));
    }

    @PostMapping
    public ResponseEntity<Member> insertMember(@RequestBody InsertMemberDto req) {
        return ResponseEntity.ok(memberService.insertMember(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Member> updateMember(@PathVariable String id, @RequestBody UpdateMemberDto.Request req) {
        return ResponseEntity.ok(memberService.updateMember(req, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable String id) {
        memberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }
}