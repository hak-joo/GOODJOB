package com.goodjob.goodjob.repository;

import com.goodjob.goodjob.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, Long> {
    Optional<User> findByEmail(String email);

}
