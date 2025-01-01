package com.chaltteok.chaltteok.user.dto;

import com.chaltteok.chaltteok.common.valueobject.LoginType;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class SocialLoginRequest {
    @NotNull
    private LoginType loginType;
    @NotNull
    private String code;
}
