package com.buana.repository;

import com.buana.model.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT * FROM spring_schema.users WHERE name LIKE CONCAT('%', :name, '%')", nativeQuery = true)
    List<User> findByNameInSchema(@Param("name") String name);
}
