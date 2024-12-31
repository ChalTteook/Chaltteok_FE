package com.chaltteok.chaltteok.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateUserResponse {
    private final String message;
}
