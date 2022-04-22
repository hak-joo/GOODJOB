package com.goodjob.goodjob.domain;


import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Data
@ToString
public class Prefer {
    private int welfare;
    private int pay;
    private int task;
    private int commute;
    private int culture;
}
