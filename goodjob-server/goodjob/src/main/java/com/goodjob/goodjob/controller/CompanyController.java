package com.goodjob.goodjob.controller;


import com.goodjob.goodjob.domain.Company;
import com.goodjob.goodjob.dto.CompanyDto;
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
    public List<Company> list(@RequestBody CompanyDto companyDto){
        List<Company> companyList = companyService.getList(companyDto);
        return companyList;
    }

    @PostMapping("/info")
    public List<Company> info(@RequestBody CompanyDto companyDto){
        List<Company> company = companyService.getInfo(companyDto);
        return company;
    }

    @PostMapping("/infoo")
    public Company infoo(@RequestBody CompanyDto companyDto){
        Company company = companyService.getInfoo(companyDto);
        System.out.println(company);
        return company;
    }

}
