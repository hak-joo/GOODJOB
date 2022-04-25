package com.goodjob.goodjob.controller;


import com.goodjob.goodjob.domain.Average;
import com.goodjob.goodjob.dto.CompanyDto;
import com.goodjob.goodjob.service.AverageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RequestMapping("/average")
public class AverageController {
    private final AverageService averageService;

    @PostMapping("/info")
    public Average info(@RequestBody CompanyDto companyDto){
        Average average = averageService.getInfo(companyDto);
        return average;
    }
}
