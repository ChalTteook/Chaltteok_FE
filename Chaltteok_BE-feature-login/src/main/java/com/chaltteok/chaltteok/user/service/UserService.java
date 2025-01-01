package com.chaltteok.chaltteok.user.service;

import com.chaltteok.chaltteok.user.model.User;
import org.springframework.stereotype.Service;

public interface UserService {

    User register(User user);

    User findUserByEmail(String email);
}
