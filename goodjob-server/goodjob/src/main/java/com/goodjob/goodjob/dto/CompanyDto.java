package com.goodjob.goodjob.dto;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.criteria.CriteriaBuilder;

@Getter
@Setter
@ToString
public class CompanyDto {
    private String name;
    private String job_group;
    private String id;

    private int page;
    private Integer welfare;
    private Integer pay;
    private Integer task;
    private Integer commute;
    private Integer culture;

    private Integer nwelfare;
    private Integer npay;
    private Integer ntask;
    private Integer ncommute;
    private Integer nculture;
}
