package com.goodjob.goodjob.dto;

import lombok.Getter;
import lombok.Setter;

public class naverDto {
    @Getter
    @Setter
    public static class RetAuth {
        private String access_token;
        private String token_type;
        private String refresh_token;
        private long expires_in;
        private String scope;
    }
}
