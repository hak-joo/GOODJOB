package com.goodjob.goodjob.domain;


import com.goodjob.goodjob.dto.CustomCompanyDto;
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
public class Company{
    private String id;

    @Field("company_name")
    private String companyName;

    @Field("work_group")
    private String workGroup;

    @Field("neg_commute")
    private double negCommute;

    @Field("neg_culture")
    private double negCulture;

    @Field("neg_pay")
    private double negPay;

    @Field("neg_task")
    private double negTask;

    @Field("neg_welfare")
    private double negWelfare;

    @Field("post_commute")
    private double postComute;

    @Field("post_culture")
    private double postCulture;

    @Field("post_pay")
    private double postPay;

    @Field("post_task")
    private double postTask;

    @Field("post_welfare")
    private double postWelfare;

    @Field("review_num")
    private double reviewNum;
}
