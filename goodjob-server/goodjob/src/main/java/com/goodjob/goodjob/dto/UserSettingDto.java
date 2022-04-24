package com.goodjob.goodjob.dto;

import com.goodjob.goodjob.domain.Prefer;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserSettingDto {
    private Prefer prefer;
    private String email;
    private String job_group;
}
