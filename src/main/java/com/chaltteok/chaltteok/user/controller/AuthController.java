package com.chaltteok.chaltteok.user.controller;

import com.chaltteok.chaltteok.user.dataaccess.UserEntity;
import com.chaltteok.chaltteok.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthController(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserEntity user) {
        if (user != null && passwordEncoder.matches(user.getPassword(),
                userService.findUserByEmail(user.getEmail()).getPassword())) {
            return ResponseEntity.ok().body("Login successful");
        }
        return ResponseEntity.badRequest().body("Invalid credentials");
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserEntity user) {
        try {
            userService.register(user);
            return ResponseEntity.ok().body("Registration successful");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed");
        }
    }
}
