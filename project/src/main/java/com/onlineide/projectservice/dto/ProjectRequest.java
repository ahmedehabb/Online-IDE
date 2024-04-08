package com.onlineide.projectservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectRequest {

        private String id;
        private String name;
        private Set<String> userIds = Set.of();
}
