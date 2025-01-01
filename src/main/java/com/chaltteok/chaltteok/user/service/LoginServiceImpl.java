package com.chaltteok.chaltteok.user.service;

import com.chaltteok.chaltteok.common.valueobject.LoginType;
import com.chaltteok.chaltteok.user.dto.SocialAuthResponse;
import com.chaltteok.chaltteok.user.dto.SocialUserResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@Component
@Qualifier("defaultLoginService")
public class LoginServiceImpl implements SocialLoginService {
    @Override
    public LoginType getServiceName() {
        return LoginType.NORMAL;
    }

    @Override
    public SocialAuthResponse getAccessToken(String authorizationCode) {
        return null;
    }

    @Override
    public SocialUserResponse getUserInfo(String accessToken) {
        return null;
    }
}