package com.goodjob.goodjob.service;


import com.goodjob.goodjob.domain.Average;
import com.goodjob.goodjob.dto.CompanyDto;
import com.goodjob.goodjob.repository.AverageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.net.ssl.SSLContext;
import javax.security.cert.X509Certificate;
import javax.transaction.Transactional;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;

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
