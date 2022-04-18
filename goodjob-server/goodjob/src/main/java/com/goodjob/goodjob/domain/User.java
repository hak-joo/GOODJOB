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
    private String nameAttributeKey;
    private Role role;

    private int welfare;
    private int pay;
    private int task;
    private int commute;
    private int culture;

    @Builder
    public User(String nameAttributeKey, String name, String gender, String birthday, String birthyear,  String email){
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
        this.birthyear = birthyear;
        this.email = email;
    }

    @Builder
    public User(String name, String gender, String birthday, String birthyear,  String email){
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
        this.birthyear = birthyear;
        this.email = email;
    }

    public User update(String name, String gender, String birthday, String birthyear){
        this.name = name;
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
        this.birthyear = birthyear;
        return this;
    }
    public String getRoleKey(){
        return this.role.getKey();
    }
}
