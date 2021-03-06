package com.goodjob.goodjob.service;

import com.goodjob.goodjob.domain.Prefer;
import com.goodjob.goodjob.domain.User;
import com.goodjob.goodjob.dto.LoginDto;
import com.goodjob.goodjob.dto.UserDto;
import com.goodjob.goodjob.dto.UserSettingDto;
import com.goodjob.goodjob.repository.UserRepository;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final RestTemplate restTemplate;
    private final Gson gson;
    private final UserRepository userRepository;

    @Value("${naver_token_url}")
    private String naverTokenUrl;

    @Value("${naver_profile_url}")
    private String naverProfileUrl;

    @Value("${naver_login_url}")
    private String naverLoginUrl;

    @Value("${naver_client_secret}")
    private String naverClientSecret;

    @Value("${naver_client_id}")
    private String naverClientId;

    @Transactional
    public UserDto getNaverProfile(LoginDto loginDto){
        String accessToken = loginDto.getCode();
        // Set header : Content-type: application/x-www-form-urlencoded
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", "Bearer " + accessToken);

        // Set http entity
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(null, headers);

        try{
            ResponseEntity<String> response = restTemplate.postForEntity(naverProfileUrl, request, String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                JsonObject jsonObject = JsonParser.parseString(response.getBody()).getAsJsonObject();

                UserDto userDto = UserDto.builder()
                        .id(jsonObject.get("response").getAsJsonObject().get("id").getAsString())
                        .name(jsonObject.get("response").getAsJsonObject().get("name").getAsString())
                        .email(jsonObject.get("response").getAsJsonObject().get("email").getAsString())
                        .gender(jsonObject.get("response").getAsJsonObject().get("gender").getAsString())
                        .build();
                return userDto;
            }

        } catch (Exception e ){
            return null;
        }
        return null;
    }

    @Transactional
    public User register(UserDto userDto){
        Prefer prefer = new Prefer();
        User user = User.builder()
                .gender(userDto.getGender())
                .name(userDto.getName())
                .email(userDto.getEmail())
                .prefer(prefer)
                .build();
        userRepository.save(user);
        return user;

    }

    @Transactional
    public String setting(UserSettingDto userSettingDto){
        User user = userRepository.findByEmail(userSettingDto.getEmail()).orElse(null);
        if(user == null) return "ERROR";
        else{
            Prefer prefer = userSettingDto.getPrefer();
            user.setPrefer(prefer);
            user.setJob_group(userSettingDto.getJob_group());
            userRepository.save(user);
            return "SUCCESS";
        }
    }
}
