package com.goodjob.goodjob.oauth.naver;

import com.goodjob.goodjob.domain.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class OAuthAttributes {
    private Map<String, Object> attributes; // OAuth2 반환하는 유저 정보 Map
    private String nameAttributeKey;
    private String name;
    private String email;
    private String birthday;
    private String birthyear;
    private String gender;


    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String name, String email, String birthday, String birthyear, String gender) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
        this.birthday = birthday;
        this.birthyear = birthyear;
        this.gender = gender;
    }

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes){
        return ofNaver("id", attributes);
    }

    // (new!)
    private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        // JSON형태이기 떄문에 Map을 통해서 데이터를 가져온다.
        Map<String, Object> response = (Map<String, Object>)attributes.get("response");

        return OAuthAttributes.builder()
                .name((String) response.get("name"))
                .email((String) response.get("email"))
                .attributes(response)
                .nameAttributeKey(userNameAttributeName)
                .gender((String) response.get("gender"))
                .birthday((String) response.get("birthday"))
                .birthyear((String) response.get("birthyear"))
                .build();
    }

    // ofGoogle 로직 생략...

    public User toEntity(){
        return User.builder()
                .name(name)
                .email(email)
                .birthday(birthday)
                .gender(gender)
                .birthyear(birthyear)
                .build();
    }

}