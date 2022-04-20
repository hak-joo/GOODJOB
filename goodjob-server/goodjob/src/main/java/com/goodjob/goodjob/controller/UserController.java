package com.goodjob.goodjob.controller;

import com.goodjob.goodjob.domain.User;
import com.goodjob.goodjob.dto.LoginDto;
import com.goodjob.goodjob.dto.UserDto;
import com.goodjob.goodjob.repository.UserRepository;
import com.goodjob.goodjob.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    private UserDto userDto;

    @PostMapping("/register")
    public User register(@RequestBody LoginDto loginDto){
        userDto = userService.getNaverProfile(loginDto);
        if(userDto == null){
            return null;
        }
        User user = userRepository.findByEmail(userDto.getEmail()).orElse(null);
        if(user == null) {
            user = userService.register(userDto);
        }
        return user;
    }

}
