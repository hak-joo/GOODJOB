package com.goodjob.goodjob.dto;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.criteria.CriteriaBuilder;

@Getter
@Setter
public class CompanyDto {
    private String name;
    private String job_group;
    private String id;

    private Integer welfare;
    private Integer pay;
    private Integer task;
    private Integer commute;
    private Integer culture;
}
