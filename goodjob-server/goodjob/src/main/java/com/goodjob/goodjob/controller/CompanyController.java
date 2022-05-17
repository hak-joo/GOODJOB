package com.goodjob.goodjob.controller;


import com.goodjob.goodjob.domain.Company;
import com.goodjob.goodjob.dto.CompanyDto;
import com.goodjob.goodjob.dto.CompanyWithPage;
import com.goodjob.goodjob.dto.CustomCompanyDto;
import com.goodjob.goodjob.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RequestMapping("/company")
public class CompanyController {
    private final CompanyService companyService;

    @PostMapping("/list")
    public CompanyWithPage list(@RequestBody CompanyDto companyDto){
        CompanyWithPage companyList = companyService.getList(companyDto);
        return companyList;
    }

    @PostMapping("/info")
    public Company info(@RequestBody CompanyDto companyDto){
        Company company = companyService.getInfo(companyDto);
        System.out.println(company);
        return company;
    }

    @PostMapping("/customlist")
    public List<CustomCompanyDto> customList(@RequestBody CompanyDto companyDto){
        List<CustomCompanyDto> companyList = companyService.getCustomList(companyDto);
        return companyList;
    }

}
