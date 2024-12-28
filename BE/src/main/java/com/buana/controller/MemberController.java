package com.buana.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.buana.dto.error.ApiErrorDto;
import com.buana.dto.member.DetailMemberDto;
import com.buana.dto.member.InsertMemberDto;
import com.buana.dto.member.ListMemberDto;
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
    public ResponseEntity<PaginationResponse<ListMemberDto>> getAllMembers(
        @RequestParam(required = false) String search,
        @RequestParam(required = false, defaultValue = "10") int limit,
        @RequestParam(required = false, defaultValue = "0") int pageIndex,
        @RequestParam(required = false, defaultValue = "createdAt") String filterBy
    ) {
        PaginationRequest paginationRequest = new PaginationRequest(search, limit, pageIndex, filterBy);
        return ResponseEntity.ok(memberService.getAllMembers(paginationRequest, search));
    }

    @Operation(summary = "Get member by id")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema(implementation = Member.class))),
        @ApiResponse(responseCode = "404", description = "Member not found", content = @Content(schema = @Schema(implementation = ApiErrorDto.class))),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ApiErrorDto.class)))
    })
    @GetMapping("/{id}")
    public ResponseEntity<DetailMemberDto> getMemberById(@PathVariable String id) {
        return ResponseEntity.ok(memberService.getMemberById(id));
    }

    @Operation(summary = "Insert member")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema(implementation = Member.class))),
        @ApiResponse(responseCode = "400", description = "Invalid request body", content = @Content(schema = @Schema(implementation = ApiErrorDto.class))),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ApiErrorDto.class)))
    })
    @PostMapping
    public ResponseEntity<Map<String, Object>> insertMember(@RequestBody InsertMemberDto req) {
        return ResponseEntity.ok(memberService.insertMember(req));
    }

    @Operation(summary = "Update member")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success", content = @Content(schema = @Schema(implementation = Member.class))),
        @ApiResponse(responseCode = "400", description = "Invalid request body", content = @Content(schema = @Schema(implementation = ApiErrorDto.class))),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ApiErrorDto.class)))
    })
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateMember(@PathVariable String id, @RequestBody UpdateMemberDto.Request req) {
        return ResponseEntity.ok(memberService.updateMember(req, id));
    }

    @Operation(summary = "Delete member")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Success"),
        @ApiResponse(responseCode = "404", description = "Member not found", content = @Content(schema = @Schema(implementation = ApiErrorDto.class))),
        @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ApiErrorDto.class)))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable String id) {
        memberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }
}
