package com.goodjob.goodjob.service;

import com.goodjob.goodjob.domain.Average;
import com.goodjob.goodjob.domain.Company;
import com.goodjob.goodjob.dto.CompanyDto;
import com.goodjob.goodjob.dto.CompanyWithPage;
import com.goodjob.goodjob.dto.CustomCompanyDto;
import com.goodjob.goodjob.repository.AverageRepository;
import com.goodjob.goodjob.repository.CompanyRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyRespository companyRespository;
    private final MongoTemplate mongoTemplate;
    private final AverageRepository averageRepository;

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
        Pageable pageable = PageRequest.of(companyDto.getPage(), 10);
        List<Company> companyList = companyRespository.findAllByWorkGroup(companyDto.getJob_group());
        int totalNum = companyList.size();
        List<CustomCompanyDto> calculated = new ArrayList<CustomCompanyDto>();
        Average average = averageRepository.findByWorkGroup(companyDto.getJob_group()).orElse(null);
        for(Company company: companyList){ //점수 측정
            double[] com = {company.getPostComute() - average.getPostComute() , company.getPostCulture() - average.getPostCulture(), company.getPostPay() - average.getPostPay(), company.getPostTask() - average.getPostTask(), company.getPostWelfare()-average.getPostWelfare()};
            double[] n_usr = {companyDto.getNcommute(), companyDto.getNculture(), companyDto.getNpay(), companyDto.getNtask(), companyDto.getNwelfare()};
            double[] usr = {companyDto.getCommute(), companyDto.getCulture(), companyDto.getPay(), companyDto.getTask(), companyDto.getWelfare()};
            CustomCompanyDto c = new CustomCompanyDto();
            c.setName(company.getCompanyName());
            c.setJob_group(company.getWorkGroup());
            c.setSimillarity(getSimilarity(com, usr) + getSimilarity(com,n_usr));
            calculated.add(c);
        }
        Collections.sort(calculated);
        List<CustomCompanyDto> result = new ArrayList<CustomCompanyDto>();
        int page = companyDto.getPage() == 0 ? 1: companyDto.getPage();
        int current = (page-1)*10;
        int last = current + 10;
        if(last > totalNum) last = totalNum;
        if(current < last){
            for(int i=current; i<last; i++){
                result.add(calculated.get(i));
            }
        }
        CompanyWithPage companyWithPage = new CompanyWithPage();
        companyWithPage.setCompanyDtoList(result);
        companyWithPage.setTotalPage(totalNum);
        companyWithPage.setLastPage(totalNum/10 + 1);
        return companyWithPage;
    }

    @Transactional
    public List<CustomCompanyDto> getCustomList(CompanyDto companyDto){
        List<Company> companyList = companyRespository.findAllByWorkGroup(companyDto.getJob_group());
        List<CustomCompanyDto> calculated = new ArrayList<CustomCompanyDto>();
        Average average = averageRepository.findByWorkGroup(companyDto.getJob_group()).orElse(null);
        for(Company company: companyList){ //점수 측정
            double[] com = {company.getPostComute() - average.getPostComute() , company.getPostCulture() - average.getPostCulture(), company.getPostPay() - average.getPostPay(), company.getPostTask() - average.getPostTask(), company.getPostWelfare()-average.getPostWelfare()};
//            double[] com = {company.getPostComute(), company.getPostCulture(), company.getPostPay(), company.getPostTask(), company.getPostWelfare()};
            double[] n_usr = {companyDto.getNcommute(), companyDto.getNculture(), companyDto.getNpay(), companyDto.getNtask(), companyDto.getNwelfare()};
            double[] usr = {companyDto.getCommute(), companyDto.getCulture(), companyDto.getPay(), companyDto.getTask(), companyDto.getWelfare()};
            CustomCompanyDto c = new CustomCompanyDto();
            c.setName(company.getCompanyName());
            c.setJob_group(company.getWorkGroup());
            c.setSimillarity(getSimilarity(com, usr) + getSimilarity(com, n_usr));
            calculated.add(c);
        }
        Collections.sort(calculated);
        for(int i=0; i<calculated.size();i++){
        }
        List<CustomCompanyDto> resultList = new ArrayList<CustomCompanyDto>();
        for(int i=0; i<10; i++){
            resultList.add(calculated.get(i));
        }
        return resultList;
    }

    @Transactional
    public CompanyWithPage getSearchResult(CompanyDto companyDto){
        Query query = new Query();
        query.addCriteria(Criteria.where("company_name").regex(".*" + companyDto.getName() + ".*"));
        if(!companyDto.getJob_group().equals("")){
            query.addCriteria(Criteria.where("work_group").is(companyDto.getJob_group()));
        }
        Average average = averageRepository.findByWorkGroup(companyDto.getJob_group()).orElse(null);
        List<Company> companyList = mongoTemplate.find(query, Company.class);
        int totalNum = companyList.size();
        List<CustomCompanyDto> calculated = new ArrayList<CustomCompanyDto>();
        for(Company company: companyList){ //점수 측정
            double[] com = {company.getPostComute() - average.getPostComute() , company.getPostCulture() - average.getPostCulture(), company.getPostPay() - average.getPostPay(), company.getPostTask() - average.getPostTask(), company.getPostWelfare()-average.getPostWelfare()};
            double[] n_usr = {companyDto.getNcommute(), companyDto.getNculture(), companyDto.getNpay(), companyDto.getNtask(), companyDto.getNwelfare()};
            double[] usr = {companyDto.getCommute(), companyDto.getCulture(), companyDto.getPay(), companyDto.getTask(), companyDto.getWelfare()};
            CustomCompanyDto c = new CustomCompanyDto();
            c.setName(company.getCompanyName());
            c.setJob_group(company.getWorkGroup());
            c.setSimillarity(getSimilarity(com, usr) + getSimilarity(com,n_usr));
            calculated.add(c);
        }
        Collections.sort(calculated);
        List<CustomCompanyDto> result = new ArrayList<CustomCompanyDto>();
        int current = (companyDto.getPage()-1)*10;
        int last = current + 10;
        if(last > totalNum) last = totalNum;
        if(current < last){
            for(int i=current; i<last; i++){
                result.add(calculated.get(i));
            }
        }
        CompanyWithPage companyWithPage = new CompanyWithPage();
        companyWithPage.setCompanyDtoList(result);
        companyWithPage.setTotalPage(totalNum);
        companyWithPage.setLastPage(totalNum/10 + 1);
        return companyWithPage;

    }

    @Transactional
    public CompanyDto getCompanyAnalysis(CompanyDto companyDto){
        CompanyDto result = new CompanyDto();

        List<Company> companyList = companyRespository.findAllByCompanyName(companyDto.getName());
        if(companyList.size() == 0){
            return null;
        }
        result.setName(companyList.get(0).getCompanyName());
        result.setCompanyDto(0,0,0,0,0,0,0,0,0,0);
        double arraySize = companyList.size();
        double numerator = 1/arraySize;

        for(int i=0; i<companyList.size(); i++){
            result.setCompanyDto(
                    result.getWelfare() + (companyList.get(i).getPostWelfare() * numerator),
                    result.getPay() + (companyList.get(i).getPostPay() * numerator),
                    result.getTask() + (companyList.get(i).getPostTask() * numerator),
                    result.getCommute() + (companyList.get(i).getPostComute() * numerator),
                    result.getCulture() + (companyList.get(i).getPostCulture()* numerator),
                    result.getNwelfare() + (companyList.get(i).getNegWelfare()* numerator),
                    result.getNpay() + (companyList.get(i).getNegPay()* numerator),
                    result.getNcommute() + (companyList.get(i).getNegCommute()* numerator),
                    result.getNtask() + (companyList.get(i).getNegTask()* numerator),
                    result.getNculture() + (companyList.get(i).getNegCulture()* numerator)
            );
        }

        return result;
    }

    @Transactional
    public List<Company> getCompanyList(CompanyDto companyDto){
        List<Company> companyList = companyRespository.findAllByCompanyName(companyDto.getName());
        return companyList;
    }

}
