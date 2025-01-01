DROP TABLE IF EXISTS "chaltteok".members CASCADE;

CREATE TABLE "chaltteok".members (
                                     id BIGSERIAL PRIMARY KEY,
                                     auth_id BIGINT NOT NULL UNIQUE,
                                     password VARCHAR(100) NOT NULL,
                                     username VARCHAR(30) NOT NULL,
                                     age INTEGER NOT NULL,
                                     gender CHAR(1) NOT NULL CHECK (gender IN ('Y', 'N')),
                                     email VARCHAR(255) NOT NULL,
                                     phone VARCHAR(14) NOT NULL,
                                     address TEXT NOT NULL,
                                     enroll_date DATE DEFAULT CURRENT_DATE,
                                     last_update DATE DEFAULT CURRENT_DATE,
                                     member_status CHAR(1) NOT NULL DEFAULT 'Y' CHECK (member_status IN ('Y', 'N')),
                                     coupon_usage CHAR(1) NOT NULL DEFAULT 'Y' CHECK (coupon_usage IN ('Y', 'N'))
);

-- 인덱스 생성
-- CREATE INDEX idx_users_user_id ON users(user_id);
-- CREATE INDEX idx_users_auth_id ON users(auth_id);
-- CREATE INDEX idx_users_email ON users(email);

-- 코멘트 추가
-- COMMENT ON TABLE users IS '회원정보';
-- COMMENT ON COLUMN users.user_id IS '회원 아이디';
-- COMMENT ON COLUMN users.auth_id IS '권한 분류 식별자';
-- COMMENT ON COLUMN users.password IS '비밀번호';
-- COMMENT ON COLUMN users.username IS '이름';
-- COMMENT ON COLUMN users.age IS '나이';
-- COMMENT ON COLUMN users.gender IS '성별';
-- COMMENT ON COLUMN users.email IS '이메일';
-- COMMENT ON COLUMN users.phone IS '핸드폰 번호';
-- COMMENT ON COLUMN users.address IS '집 주소';
-- COMMENT ON COLUMN users.enroll_date IS '회원가입 일자';
-- COMMENT ON COLUMN users.last_update IS '회원정보 수정일자';
-- COMMENT ON COLUMN users.member_status IS '활동 상태';
-- COMMENT ON COLUMN users.coupon_usage IS '쿠폰 사용 여부';
--
