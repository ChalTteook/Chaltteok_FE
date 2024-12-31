package com.chaltteok.chaltteok.user.service;

import com.chaltteok.chaltteok.common.exception.Exception;
import com.chaltteok.chaltteok.common.exception.UserNotFoundException;
import com.chaltteok.chaltteok.user.dataaccess.UserEntity;
import com.chaltteok.chaltteok.user.dataaccess.UserMapper;
import com.chaltteok.chaltteok.user.dataaccess.UserRepository;
import com.chaltteok.chaltteok.user.dto.CreateUserCommand;
import com.chaltteok.chaltteok.user.dto.CreateUserResponse;
import com.chaltteok.chaltteok.user.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    @Override
    public CreateUserResponse userRegister(CreateUserCommand createUserCommand) {
        User user = userMapper.CreateUserCommandToUser(createUserCommand);
        User createdUser = userMapper.UserEntityToUser(
                userRepository.save(userMapper.UserToUserEntity(user)));
        if (createdUser == null) {
            throw new Exception("User creation failed");
        }
        return userMapper.UserToCreateUserResponse(createdUser);
    }

//    @Override
//    public UserEntity loginByEmail(String email, String password) {
//        return userRepository.findByEmail(email)
//                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
//                .orElse(null);
//    }
//
//    @Override
//    public UserEntity findUserByEmail(String email) {
//        return userRepository.findByEmail(email)
//                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
//    }
}
