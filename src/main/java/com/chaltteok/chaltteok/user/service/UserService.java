package com.chaltteok.chaltteok.user.service;

import com.chaltteok.chaltteok.user.dataaccess.UserEntity;
import com.chaltteok.chaltteok.user.dto.CreateUserCommand;
import com.chaltteok.chaltteok.user.dto.CreateUserResponse;
import jakarta.validation.Valid;

public interface UserService {

    CreateUserResponse userRegister(@Valid CreateUserCommand createUserCommand);

//    UserEntity loginByEmail(String email, String password);

//    UserEntity findUserByEmail(String email);
}
