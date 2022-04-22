package com.goodjob.goodjob.domain;


import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Data
@Document(collection = "user")
@ToString
public class User {
    private String id;
    private String name;
    private String gender;
    private String birthday;
    private String birthyear;
    private String email;
    private String job_group;
    private Prefer prefer;


    @Builder
    public User(String id, String name, String gender, String birthday, String birthyear,  String email, Prefer prefer){
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
        this.birthyear = birthyear;
        this.email = email;
        this.prefer = prefer;
    }
}
