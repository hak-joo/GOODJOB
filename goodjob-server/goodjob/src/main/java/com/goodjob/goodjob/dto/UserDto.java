package com.goodjob.goodjob.dto;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class UserDto {
    private String id;
    private String name;
    private String gender;
    private String birthday;
    private String birthyear;
    private String email;

    @Builder
    public UserDto(String id, String name, String gender, String birthyear, String birthday, String email) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
        this.birthyear = birthyear;
        this.email = email;
    }

}
