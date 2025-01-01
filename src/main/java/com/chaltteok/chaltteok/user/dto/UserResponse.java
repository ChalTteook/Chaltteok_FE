package com.chaltteok.chaltteok.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserResponse {
    private String userName;
    private String userEmail;
    private String phone;
    private String address;
    private String memberStatus;
    private String couponUsage;
}