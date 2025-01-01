package com.chaltteok.chaltteok.user.controller;

import com.chaltteok.chaltteok.user.dataaccess.UserEntity;
import com.chaltteok.chaltteok.user.dto.*;
import com.chaltteok.chaltteok.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserController(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public UserResponse login(@RequestBody LoginRequest loginRequest) {
        return userService.loginByEmail(loginRequest);
//        if (user != null && passwordEncoder.matches(user.getPassword(),
//                userService.getUserByEmail(user.getEmail()).getPassword())) {
//            return ResponseEntity.ok().body("Login successful");
//        }
//        return ResponseEntity.badRequest().body("Invalid credentials");
    }

    @PostMapping("/social-login")
    public ResponseEntity<LoginResponse> doSocialLogin(@RequestBody @Valid SocialLoginRequest request) {

        return ResponseEntity.created(URI.create("/social-login"))
                .body(userService.doSocialLogin(request));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserJoinRequest userJoinRequest) {
        try {
            userService.userRegister(userJoinRequest);
            return ResponseEntity.ok().body("Registration successful");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed");
        }
    }
}
