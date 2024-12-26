package com.buana.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.buana.model.Member;

public interface MemberRepository extends JpaRepository<Member, String> {

    @Query("SELECT m FROM Member m WHERE m.name LIKE %:search%")
    List<Member> findByNameContaining(@Param("search") String search);
    
    List<Member> findByNameContainingIgnoreCase(String name);
    
}
