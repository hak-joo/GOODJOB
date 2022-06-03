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
    private String email;

    @Builder
    public UserDto(String id, String name, String gender, String email) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.email = email;
    }

}
