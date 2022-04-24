package com.goodjob.goodjob.domain;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Column;

@Getter
@Setter
@Data
@Document(collection = "counting")
@ToString
public class Company {
    private String id;

    @Field("company_name")
    private String companyName;

    @Field("work_group")
    private String workGroup;
}
