package com.chaltteok.chaltteok.user.dataaccess;

import com.chaltteok.chaltteok.user.dto.UserJoinRequest;
import com.chaltteok.chaltteok.user.dto.UserJoinResponse;
import com.chaltteok.chaltteok.user.dto.UserResponse;
import com.chaltteok.chaltteok.user.model.User;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserMapper {

    public User userJoinRequestToUser(UserJoinRequest userJoinRequest) {
        return User.builder()
                .authId(userJoinRequest.getAuthId())
                .password(Optional.ofNullable(User.hashPassword(userJoinRequest.getPassword())).orElse(""))
                .username(Optional.ofNullable(userJoinRequest.getUsername()).orElse(""))
                .age(userJoinRequest.getAge())
                .gender(Optional.ofNullable(userJoinRequest.getGender()).orElse(""))
                .email(Optional.ofNullable(userJoinRequest.getEmail()).orElse(""))
                .phone(Optional.ofNullable(userJoinRequest.getPhone()).orElse(""))
                .address(Optional.ofNullable(userJoinRequest.getAddress()).orElse(""))
                .build();
    }

    public UserJoinResponse userToUserJoinResponse(User user) {
        return UserJoinResponse.builder()
//                .id(user.getId())
                .message("Success")
                .build();
    }

    public UserEntity userToUserEntity(User user) {
        return new UserEntity().builder()
                .authId(user.getAuthId())
                .password(user.getPassword())
                .username(user.getUsername())
                .age(user.getAge())
                .gender(user.getGender())
                .email(user.getEmail())
                .phone(user.getPhone())
                .address(user.getAddress())
                .enrollDate(user.getEnrollDate())
                .lastUpdate(user.getLastUpdate())
                .couponUsage(user.getCouponUsage())
                .memberStatus(user.getMemberStatus())
                .build();
    }

    public User userEntityToUser(UserEntity userEntity) {
        return User.builder()
                .authId(userEntity.getAuthId())
                .password(userEntity.getPassword())
                .username(userEntity.getUsername())
                .age(userEntity.getAge())
                .gender(userEntity.getGender())
                .email(userEntity.getEmail())
                .phone(userEntity.getPhone())
                .address(userEntity.getAddress())
                .enrollDate(userEntity.getEnrollDate())
                .lastUpdate(userEntity.getLastUpdate())
                .couponUsage(userEntity.getCouponUsage())
                .memberStatus(userEntity.getMemberStatus())
                .build();
    }

    public UserResponse userToUserResponse(User user) {
        return UserResponse.builder()
                .userEmail(user.getEmail())
                .userName(user.getUsername())
                .phone(user.getPhone())
                .address(user.getAddress())
                .couponUsage(user.getCouponUsage())
                .memberStatus(user.getMemberStatus())
                .build();
    }
}
