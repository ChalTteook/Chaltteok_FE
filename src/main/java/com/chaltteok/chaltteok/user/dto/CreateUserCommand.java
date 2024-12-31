package com.chaltteok.chaltteok.user.dto;

import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
public class CreateUserCommand {
    @NotBlank
    @Size(max = 30)
    private String userId;

    @NotNull
    private Long authId;

    @NotBlank
    @Size(max = 30)
    private String password;

    @NotBlank
    @Size(max = 30)
    private String username;

    @NotNull
    @Min(0)
    private Integer age;

    @NotBlank
    @Pattern(regexp = "[YN]")
    private String gender;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Pattern(regexp = "\\d{10,14}")
    private String phone;

    @NotBlank
    private String address;

    private Date enrollDate;
    private Date lastUpdate;

    @Pattern(regexp = "[YN]")
    private String memberStatus = "Y";

    @Pattern(regexp = "[YN]")
    private String couponUsage = "Y";
}
