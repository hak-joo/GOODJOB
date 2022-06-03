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
    private String email;
    private String job_group;
    private Prefer prefer;


    @Builder
    public User(String id, String name, String gender, Prefer prefer, String email){
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.job_group = "";
        this.prefer = prefer;
        this.email = email;
    }
}
