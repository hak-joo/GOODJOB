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
    private double welfare;
    private double pay;
    private double task;
    private double commute;
    private double culture;

    private double nwelfare;
    private double npay;
    private double ntask;
    private double ncommute;
    private double nculture;

    public void setCompanyDto(double welfare, double pay, double task, double commute, double culture, double nwelfare, double npay, double ncommute, double ntask, double nculture){

        this.welfare = welfare;
        this.pay = pay;
        this.task = task;
        this.commute = commute;
        this.culture = culture;
        this.nwelfare = nwelfare;
        this.npay = npay;
        this.ntask = ntask;
        this.ncommute = ncommute;
        this.nculture = nculture;
    }
}
