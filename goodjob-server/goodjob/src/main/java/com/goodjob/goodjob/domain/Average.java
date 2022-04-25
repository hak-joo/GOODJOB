package com.goodjob.goodjob.domain;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@Data
@Document(collection = "avg")
@ToString
public class Average {
    private String id;

    @Field("work_group")
    private String workGroup;

    @Field("avg(neg_commute)")
    private double negCommute;

    @Field("avg(neg_culture)")
    private double negCulture;

    @Field("avg(neg_pay)")
    private double negPay;

    @Field("avg(neg_task)")
    private double negTask;

    @Field("avg(neg_welfare)")
    private double negWelfare;

    @Field("avg(post_commute)")
    private double postComute;

    @Field("avg(post_culture)")
    private double postCulture;

    @Field("avg(post_pay)")
    private double postPay;

    @Field("avg(post_task)")
    private double postTask;

    @Field("avg(post_welfare)")
    private double postWelfare;

    @Field("avg(review_num)")
    private double reviewNum;

}
