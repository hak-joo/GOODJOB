package com.goodjob.goodjob.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CompanyWithPage {
    private List<CustomCompanyDto> companyDtoList;
    private int page;
    private int totalPage;

}
