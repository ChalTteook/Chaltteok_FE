package com.chaltteok.chaltteok.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserLoginDto {
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String password;
}
