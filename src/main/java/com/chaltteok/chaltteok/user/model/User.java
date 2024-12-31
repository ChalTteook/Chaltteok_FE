package com.chaltteok.chaltteok.user.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "members")
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long authId;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 30, nullable = false)
    private String username;

    @Column(nullable = false)
    private Integer age;

    @Column(length = 1, nullable = false)
    private String gender;

    @Column(nullable = false)
    private String email;

    @Column(length = 14, nullable = false)
    private String phone;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private java.util.Date enrollDate;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private java.util.Date lastUpdate;

    @Column(length = 1, nullable = false)
    private String memberStatus = "Y";

    @Column(length = 1, nullable = false)
    private String couponUsage = "Y";
}
