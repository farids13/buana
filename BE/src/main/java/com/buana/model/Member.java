package com.buana.model;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "members")
public class Member {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @UuidGenerator
    @Column(name = "id", nullable = false, columnDefinition = "VARCHAR(36)")
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "phone", columnDefinition = "VARCHAR(20)")
    private String phone;
    
    @Column(name = "position")
    private String position;

    @Column(name = "departement")
    private String departement;

    @ManyToOne
    @JoinColumn(name = "superior_id", columnDefinition = "VARCHAR(36)")
    private Member superior;
    
    @Column(name = "img_url")
    private String imgUrl;

    @OneToMany(mappedBy = "superior")
    @JsonIgnore
    private List<Member> memberUsers;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "created_by")
    private String createdBy;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "updated_by")
    private String updatedBy;
    
    @Column(name = "is_deleted")
    private Boolean isDeleted;
    
    @Column(name = "deleted_by")
    private String deletedBy;
}
