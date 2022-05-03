package com.goodjob.goodjob.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomCompanyDto implements Comparable<CustomCompanyDto>{
    private String name;
    private String job_group;

    private double simillarity;

    @Override
    public int compareTo(CustomCompanyDto c){
        if(c.simillarity < simillarity){
            return -1;
        } else if (c.simillarity < simillarity){
            return 1;
        } else{
            return 0;
        }
    }
}
