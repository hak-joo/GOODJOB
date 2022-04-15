package com.goodjob.goodjob.dto;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Document(collection = "user")
@ToString
public class User {
    private String name;
    private String gender;
    private String birthday;
    private String birthyear;

    @Builder
    public User(String name, String gender, String birthday, String birthyear){
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
        this.birthyear = birthyear;
    }
}
