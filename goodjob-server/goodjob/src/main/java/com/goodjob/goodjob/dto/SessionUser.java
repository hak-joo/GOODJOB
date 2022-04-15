package com.goodjob.goodjob.dto;

import com.goodjob.goodjob.domain.User;
import lombok.Getter;
import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {

    private String name;
    private String email;

    public SessionUser(User user){
        this.name = user.getName();
        this.email = user.getEmail();
    }
}