package com.chaltteok.chaltteok.user.repository;

import com.chaltteok.chaltteok.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String userId);
}
