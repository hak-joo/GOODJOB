package com.goodjob.goodjob.repository;

import com.goodjob.goodjob.domain.Company;
import org.springframework.data.mongodb.repository.MongoRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface CompanyRespository extends MongoRepository<Company, Long> {
    Optional<Company> findById(String id);
    List<Company> findAllByWorkGroup(String group);
    Optional<Company> findByCompanyNameAndWorkGroup(String name, String group);

}
