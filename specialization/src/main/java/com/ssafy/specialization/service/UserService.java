package com.ssafy.specialization.service;

import com.ssafy.specialization.dto.JoinRequestDto;
import com.ssafy.specialization.entity.User;
import com.ssafy.specialization.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.ssafy.specialization.entity.enums.Sex.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final PasswordEncoder encoder;
    private final UserRepository userRepository;

    @Transactional
    public long join(JoinRequestDto requestDto) {
        equalCheckPasswordAndPasswordChk(requestDto);

        validDuplicateUser(requestDto);

        // JoinRequestDto to User Entity
        User user = User.builder()
                .username(requestDto.getUsername())
                .password(encoder.encode(requestDto.getPassword()))
                .sex(requestDto.getSex().equals("male") ? MALE : FEMALE)
                .yearOfBirth(requestDto.getYearOfBirth())
                .build();

        // 회원가입
        User saveUser = userRepository.save(user);
        return saveUser.getId();
    }

    // 비밀번호, 비밀번호 확인 불일치 검사
    private void equalCheckPasswordAndPasswordChk(JoinRequestDto requestDto) {
        if (!(requestDto.getPassword().equals(requestDto.getPasswordChk()))) {
            throw new BadCredentialsException("비밀번호와 비밀번호 확인 불일치");
        }
    }

    // 회원중복검사
    private void validDuplicateUser(JoinRequestDto requestDto) {
        Optional<User> findUser = userRepository.findByUsername(requestDto.getUsername());
        if (!findUser.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 회원");
        }
    }
}
