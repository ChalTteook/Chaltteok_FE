package com.chaltteok.chaltteok.user.service;

import com.chaltteok.chaltteok.common.exception.Exception;
import com.chaltteok.chaltteok.common.valueobject.LoginType;
import com.chaltteok.chaltteok.user.dataaccess.UserEntity;
import com.chaltteok.chaltteok.user.dataaccess.UserMapper;
import com.chaltteok.chaltteok.user.dataaccess.UserRepository;
import com.chaltteok.chaltteok.user.dto.*;
import com.chaltteok.chaltteok.user.feign.NaverUserApi;
import com.chaltteok.chaltteok.user.model.User;
import com.chaltteok.chaltteok.common.exception.NotFoundException;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    private final List<SocialLoginService> loginServices;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       UserMapper userMapper,
                       List<SocialLoginService> loginServices) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.loginServices = loginServices;
    }

    public UserJoinResponse userRegister(UserJoinRequest userJoinRequest) {
        User user = userMapper.userJoinRequestToUser(userJoinRequest);
        User createdUser = userMapper.userEntityToUser(
                userRepository.save(userMapper.userToUserEntity(user)));
        if (createdUser == null) {
            throw new Exception("User creation failed");
        }
        return userMapper.userToUserJoinResponse(createdUser);
    }

    public LoginResponse doSocialLogin(SocialLoginRequest request) {
        SocialLoginService loginService = this.getLoginService(request.getLoginType());

        SocialAuthResponse socialAuthResponse = loginService.getAccessToken(request.getCode());

        SocialUserResponse socialUserResponse = loginService.getUserInfo(socialAuthResponse.getAccess_token());
        log.info("socialUserResponse {} ", socialUserResponse.toString());

        if (userRepository.findByEmail(socialUserResponse.getEmail()).isEmpty()) {
            this.joinUser(
                    UserJoinRequest.builder()
                            .userId(socialUserResponse.getId())
                            .email(socialUserResponse.getEmail())
                            .username(socialUserResponse.getName())
                            .build()
            );
        }

        User user = userMapper.userEntityToUser(userRepository.findByEmail(socialUserResponse.getEmail())
                .orElseThrow(() -> new NotFoundException("ERROR_001", "유저 정보를 찾을 수 없습니다."))
                );

        return LoginResponse.builder()
//                .id(user.getId().getValue())
                .build();
    }

    private UserJoinResponse joinUser(UserJoinRequest userJoinRequest) {
        User user = userMapper.userJoinRequestToUser(userJoinRequest);
        UserEntity createdUser = userRepository.save(userMapper.userToUserEntity(user));

        return userMapper.userToUserJoinResponse(
                userMapper.userEntityToUser(createdUser));
    }

    private SocialLoginService getLoginService(LoginType loginType) {
        for (SocialLoginService loginService: loginServices) {
            if (loginType.equals(loginService.getServiceName())) {
                log.info("login service name: {}", loginService.getServiceName());
                return loginService;
            }
        }
        return new LoginServiceImpl();
    }

    public UserResponse loginByEmail(LoginRequest loginRequest) {
        User user = getUserByEmail(loginRequest.getEmail());
        passwordEncoder.matches(loginRequest.getPassword(), user.getPassword());
        return userMapper.userToUserResponse(user);
    }

    public User getUserByEmail(String email) {
        UserEntity userEntity = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("ERROR_001", "유저 정보를 찾을 수 없습니다."));
        return userMapper.userEntityToUser(userEntity);
    }

    public User getUser(Long id) {
        UserEntity userEntity = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("ERROR_001", "유저 정보를 찾을 수 없습니다."));
        return userMapper.userEntityToUser(userEntity);
    }

}
