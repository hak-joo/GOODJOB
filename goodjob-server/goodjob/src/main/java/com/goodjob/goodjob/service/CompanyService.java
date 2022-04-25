package com.goodjob.goodjob.service;

import com.goodjob.goodjob.domain.Company;
import com.goodjob.goodjob.dto.CompanyDto;
import com.goodjob.goodjob.repository.CompanyRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.naming.CompositeName;
import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRespository companyRespository;



    @Transactional
    public Company getInfo(CompanyDto companyDto){
        Company company = companyRespository.findByCompanyNameAndWorkGroup(companyDto.getName(), companyDto.getJob_group()).orElse(null);
        return company;

    }

    @Transactional
    public List<Company> getList(CompanyDto companyDto){
        List<Company> companyList = companyRespository.findAllByWorkGroup(companyDto.getJob_group());
        return companyList;
    }
}
