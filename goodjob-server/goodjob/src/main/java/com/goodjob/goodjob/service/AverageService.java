package com.goodjob.goodjob.service;


import com.goodjob.goodjob.domain.Average;
import com.goodjob.goodjob.dto.CompanyDto;
import com.goodjob.goodjob.repository.AverageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class AverageService {

    private final AverageRepository averageRepository;

    @Transactional
    public Average getInfo(CompanyDto companyDto){
        Average average = averageRepository.findByWorkGroup(companyDto.getJob_group()).orElse(null);
        return average;
    }
}
