package com.buana.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.buana.dto.member.DetailMemberDto;
import com.buana.dto.member.InsertMemberDto;
import com.buana.dto.member.ListMemberDto;
import com.buana.dto.member.UpdateMemberDto;
import com.buana.dto.pagination.PaginationRequest;
import com.buana.dto.pagination.PaginationResponse;
import com.buana.model.Member;
import com.buana.repository.MemberRepository;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public PaginationResponse<ListMemberDto> getAllMembers(PaginationRequest req, String search) {
        List<Member> members;
        
        if (search != null && !search.isEmpty()) {
            members = memberRepository.searchMembers(search);
        } else {
            members = memberRepository.findByIsDeletedFalse();
        }

        int start = req.pageIndex * req.limit;
        int end = Math.min(start + req.limit, members.size());
        
        List<Member> pagedMembers = members.subList(start, end);
        
        List<ListMemberDto> memberDtos = pagedMembers.stream()
            .map(member -> {
                ListMemberDto dto = new ListMemberDto();
                dto.setId(member.getId());
                dto.setName(member.getName());
                dto.setEmail(member.getEmail());
                dto.setPhone(member.getPhone());
                dto.setPosition(member.getPosition());
                dto.setImgUrl(member.getImgUrl());
                dto.setDepartement(member.getDepartement());
                if (member.getSuperior() != null) {
                    dto.setSuperior(member.getSuperior().getName());
                }
                return dto;
            })
            .collect(Collectors.toList());

        return new PaginationResponse<ListMemberDto>(
            memberDtos,
            members.size(),
            req.pageIndex,
            (int) Math.ceil(members.size() / (double) req.limit)
        );
    }

    public DetailMemberDto getMemberById(String id) {
        Member member = memberRepository.findById(id).orElse(null);
        if(member == null) {
            throw new IllegalArgumentException("Member not found");
        }
        DetailMemberDto dto = new DetailMemberDto();
        dto.setId(member.getId());
        dto.setName(member.getName());
        dto.setEmail(member.getEmail());
        dto.setPhone(member.getPhone());
        dto.setImgUrl(member.getImgUrl());
        dto.setPosition(member.getPosition());
        dto.setDepartement(member.getDepartement());
        dto.setSuperior(member.getSuperior().getId());
        return dto;
    }

    public Map<String, Object> insertMember(InsertMemberDto req) {
        if( req == null) {
            throw new IllegalArgumentException("Request cannot be null");
        }

        Member member = new Member();
        member.setName(req.name());
        member.setEmail(req.email());
        member.setPhone(req.phone());
        member.setPosition(req.position());
        member.setDepartement(req.departement());
        member.setImgUrl(req.imgUrl());
        member.setIsDeleted(false);
        if (req.superior() != null && !req.superior().isEmpty()) {
            member.setSuperior(memberRepository.findById(req.superior()).orElse(null));
        }
        memberRepository.save(member);
        return new HashMap<String, Object>() {{
            put("message", "Member inserted successfully");
            put("member", member.getId());
        }};
    }

    public Map<String, Object> updateMember(UpdateMemberDto.Request req, String id) {
        Member member = memberRepository.findById(id).orElse(null);
        if(member == null) {
            throw new IllegalArgumentException("Member not found");
        }
        member.setName(req.name());
        member.setEmail(req.email());
        member.setPhone(req.phone());
        member.setPosition(req.position());
        member.setDepartement(req.departement());
        member.setImgUrl(req.imgUrl());
        if (req.superior() != null && !req.superior().isEmpty()) {
            member.setSuperior(memberRepository.findById(req.superior()).orElse(null));
        }
        member.setIsDeleted(false);
        memberRepository.save(member);
        return new HashMap<String, Object>() {{
            put("message", "Member updated successfully");
            put("member", member.getId());
        }};
    }

    public void deleteMember(String id) {
        Member member = memberRepository.findById(id).orElse(null);
        if(member == null) {
            throw new IllegalArgumentException("Member not found");
        }
        member.setIsDeleted(true);
        memberRepository.save(member);
    }
    
}


