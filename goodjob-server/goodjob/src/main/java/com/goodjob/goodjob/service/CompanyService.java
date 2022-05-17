package com.goodjob.goodjob.service;

import com.goodjob.goodjob.domain.Company;
import com.goodjob.goodjob.dto.CompanyDto;
import com.goodjob.goodjob.dto.CompanyWithPage;
import com.goodjob.goodjob.dto.CustomCompanyDto;
import com.goodjob.goodjob.repository.CompanyRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRespository companyRespository;


    double getSimilarity (double[] com, double[] usr){
        double numerator = 0.0;
        for (int i=0; i<5; i++) {
            numerator = numerator + com[i] * usr[i];
        }
        double d_com = 0.0;
        double d_usr = 0.0;
        for(int i=0; i<5; i++){
            d_com = d_com + Math.pow(com[i], 2);
            d_usr = d_usr + Math.pow(usr[i], 2);
        }
        double denominator = Math.sqrt(d_com) * Math.sqrt(d_usr);
        if (denominator == 0){
            return 0.0;
        }
        return numerator/denominator;
    }




    @Transactional
    public Company getInfo(CompanyDto companyDto){
        Company company = companyRespository.findByCompanyNameAndWorkGroup(companyDto.getName(), companyDto.getJob_group()).orElse(null);
        return company;

    }

    @Transactional
    public CompanyWithPage getList(CompanyDto companyDto){
        System.out.println(companyDto);
        Pageable pageable = PageRequest.of(companyDto.getPage(), 8);
        List<Company> companyList = companyRespository.findAllByWorkGroup(companyDto.getJob_group(), pageable);
        int totalNum = companyRespository.findAllByWorkGroup(companyDto.getJob_group()).size()/8 + 1;
        List<CustomCompanyDto> calculated = new ArrayList<CustomCompanyDto>();
        for(Company company: companyList){ //점수 측정
            double[] com = {company.getPostComute(), company.getPostCulture(), company.getPostPay(), company.getPostTask(), company.getPostWelfare()};
            double[] usr = {companyDto.getCommute(), companyDto.getCulture(), companyDto.getPay(), companyDto.getTask(), companyDto.getWelfare()};
            CustomCompanyDto c = new CustomCompanyDto();
            c.setName(company.getCompanyName());
            c.setJob_group(company.getWorkGroup());
            c.setSimillarity(getSimilarity(com, usr));
            calculated.add(c);
        }
        Collections.sort(calculated);
        CompanyWithPage companyWithPage = new CompanyWithPage();
        companyWithPage.setCompanyDtoList(calculated);
        companyWithPage.setTotalPage(totalNum);
        return companyWithPage;
    }

    @Transactional
    public List<CustomCompanyDto> getCustomList(CompanyDto companyDto){
        List<Company> companyList = companyRespository.findAllByWorkGroup(companyDto.getJob_group());
        List<CustomCompanyDto> calculated = new ArrayList<CustomCompanyDto>();
        for(Company company: companyList){ //점수 측정
            double[] com = {company.getPostComute(), company.getPostCulture(), company.getPostPay(), company.getPostTask(), company.getPostWelfare()};
            double[] usr = {companyDto.getCommute(), companyDto.getCulture(), companyDto.getPay(), companyDto.getTask(), companyDto.getWelfare()};
            CustomCompanyDto c = new CustomCompanyDto();
            c.setName(company.getCompanyName());
            c.setJob_group(company.getWorkGroup());
            c.setSimillarity(getSimilarity(com, usr));
            calculated.add(c);
        }
        Collections.sort(calculated);
        List<CustomCompanyDto> resultList = new ArrayList<CustomCompanyDto>();
        for(int i=0; i<10; i++){
            resultList.add(calculated.get(i));
        }
        return resultList;
    }
}
