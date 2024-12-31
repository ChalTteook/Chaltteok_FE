package com.chaltteok.chaltteok.user.model;

import com.chaltteok.chaltteok.common.entity.BaseEntity;
import com.chaltteok.chaltteok.common.valueobject.UserId;
import lombok.Getter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;

@Getter
public class User extends BaseEntity<UserId> {

    private final Long authId;
    private String password;
    private String username;
    private Integer age;
    private String gender;
    private String email;
    private String phone;
    private String address;
    private Date enrollDate;
    private Date lastUpdate;
    private String memberStatus;
    private String couponUsage;

    private User(Builder builder) {
        setId(builder.userId);
        authId = builder.authId;
        password = builder.password;
        username = builder.username;
        age = builder.age;
        gender = builder.gender;
        email = builder.email;
        phone = builder.phone;
        address = builder.address;
        enrollDate = builder.enrollDate;
        lastUpdate = builder.lastUpdate;
        memberStatus = builder.memberStatus;
        couponUsage = builder.couponUsage;
    }


    public static Builder builder() {
        return new Builder()
                .enrollDate(new Date())
                .lastUpdate(new Date())
                .memberStatus("Y")
                .couponUsage("Y");
    }

    public void updatePassword(String newPassword) {
        password = hashPassword(newPassword);
    }

    public void updateAddress(String address) {
        this.address = address;
    }

    public static String hashPassword(String password) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.encode(password);
    }

    public static final class Builder {
        private UserId userId;
        private Long authId;
        private String password;
        private String username;
        private Integer age;
        private String gender;
        private String email;
        private String phone;
        private String address;
        private Date enrollDate;
        private Date lastUpdate;
        private String memberStatus;
        private String couponUsage;

        private Builder() {
        }

        public Builder id(UserId val) {
            userId = val;
            return this;
        }

        public Builder authId(Long val) {
            authId = val;
            return this;
        }

        public Builder password(String val) {
            password = val;
            return this;
        }

        public Builder username(String val) {
            username = val;
            return this;
        }

        public Builder age(Integer val) {
            age = val;
            return this;
        }

        public Builder gender(String val) {
            gender = val;
            return this;
        }

        public Builder email(String val) {
            email = val;
            return this;
        }

        public Builder phone(String val) {
            phone = val;
            return this;
        }

        public Builder address(String val) {
            address = val;
            return this;
        }

        public Builder enrollDate(Date val) {
            enrollDate = val;
            return this;
        }

        public Builder lastUpdate(Date val) {
            lastUpdate = val;
            return this;
        }

        public Builder memberStatus(String val) {
            memberStatus = val;
            return this;
        }

        public Builder couponUsage(String val) {
            couponUsage = val;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }
}
