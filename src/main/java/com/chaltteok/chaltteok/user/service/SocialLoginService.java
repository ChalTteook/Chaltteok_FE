package com.chaltteok.chaltteok.user.service;

import com.chaltteok.chaltteok.common.valueobject.LoginType;
import com.chaltteok.chaltteok.user.dto.SocialAuthResponse;
import com.chaltteok.chaltteok.user.dto.SocialUserResponse;
import org.springframework.stereotype.Service;

@Service
public interface SocialLoginService {
    LoginType getServiceName();
    SocialAuthResponse getAccessToken(String authorizationCode);
    SocialUserResponse getUserInfo(String accessToken);
}
