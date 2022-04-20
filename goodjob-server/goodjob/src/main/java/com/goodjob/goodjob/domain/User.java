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

    private int welfare;
    private int pay;
    private int task;
    private int commute;
    private int culture;

    @Builder
    public User(String id, String name, String gender, String birthday, String birthyear,  String email){
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
        this.birthyear = birthyear;
        this.email = email;
    }
}
