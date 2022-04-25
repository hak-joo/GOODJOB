package com.goodjob.goodjob.repository;

import com.goodjob.goodjob.domain.Average;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AverageRepository extends MongoRepository<Average, Long> {
    Optional<Average> findByWorkGroup(String name);
}
