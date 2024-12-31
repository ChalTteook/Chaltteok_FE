package com.chaltteok.chaltteok.user.dataaccess;

import com.chaltteok.chaltteok.user.dto.CreateUserCommand;
import com.chaltteok.chaltteok.user.dto.CreateUserResponse;
import com.chaltteok.chaltteok.user.model.User;
import org.springframework.context.annotation.Bean;

public class UserMapper {

    public User CreateUserCommandToUser(CreateUserCommand createUserCommand) {
        return User.builder()
                .authId(createUserCommand.getAuthId())
                .password(createUserCommand.getPassword())
                .username(createUserCommand.getUsername())
                .age(createUserCommand.getAge())
                .gender(createUserCommand.getGender())
                .email(createUserCommand.getEmail())
                .phone(createUserCommand.getPhone())
                .address(createUserCommand.getAddress())
                .build();
    }

    public CreateUserResponse UserToCreateUserResponse(User user) {
        return CreateUserResponse.builder()
                .message("Success")
                .build();
    }

    public UserEntity UserToUserEntity(User user) {
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

    public User UserEntityToUser(UserEntity userEntity) {
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
}
