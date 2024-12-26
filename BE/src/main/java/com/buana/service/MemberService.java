package com.buana.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.buana.dto.member.InsertMemberDto;
import com.buana.dto.member.UpdateMemberDto;
import com.buana.dto.pagination.PaginationRequest;
import com.buana.dto.pagination.PaginationResponse;
import com.buana.model.Member;
import com.buana.repository.MemberRepository;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public PaginationResponse<Member> getAllMembers(PaginationRequest req, String searchTerm) {
        List<Member> members;
        
        if (searchTerm != null && !searchTerm.isEmpty()) {
            // Gunakan method baru dari repository untuk pencarian
            members = memberRepository.findByNameContainingIgnoreCase(searchTerm);
        } else {
            members = memberRepository.findAll();
        }

        int start = req.pageIndex * req.limit;
        int end = Math.min(start + req.limit, members.size());
        
        List<Member> pagedMembers = members.subList(start, end);

        return new PaginationResponse<Member>(
            pagedMembers,
            members.size(),
            req.pageIndex,
            (int) Math.ceil(members.size() / (double) req.limit)
        );
    }

    public Member getMemberById(String id) {
        return memberRepository.findById(id).orElse(null);
    }

    public Member insertMember(InsertMemberDto req) {
        if( req == null) {
            throw new IllegalArgumentException("Request cannot be null");
        }

        Member member = new Member();
        member.setName(req.name());
        member.setEmail(req.email());
        member.setPhone(req.phone());
        member.setPosition(req.position());
        member.setDepartement(req.departement());
        return memberRepository.save(member);
    }

    public Member updateMember(UpdateMemberDto.Request req, String id) {
        Member member = memberRepository.findById(id).orElse(null);
        if(member == null) {
            throw new IllegalArgumentException("Member not found");
        }
        member.setName(req.name());
        member.setEmail(req.email());
        member.setPhone(req.phone());
        member.setPosition(req.position());
        member.setDepartement(req.departement());
        return memberRepository.save(member);
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


