package com.onlineide.projectservice.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileRequest {

        private String id;
        private String fileName;
        private String code;
        private ProjectRequest project;
}
