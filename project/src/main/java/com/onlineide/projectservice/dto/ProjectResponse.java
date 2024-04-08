package com.onlineide.projectservice.dto;

import com.onlineide.projectservice.model.Project;
import com.onlineide.projectservice.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectResponse {

        private String id;
        private String name;
        private List<String> userIds = List.of();

    public static List<ProjectResponse> fromProjects(List<Project> projects) {

        return projects.stream()
                .map(project -> ProjectResponse.builder()
                        .id(project.getId())
                        .name(project.getName())
                        .userIds(project.getUsers().stream()
                                .map(User::getUsername)
                                .toList())
                        .build())
                .toList();
    }

    public static ProjectResponse fromProject(Project project) {

            return ProjectResponse.builder()
                    .id(project.getId())
                    .name(project.getName())
                    .userIds(project.getUsers().stream()
                            .map(User::getUsername)
                            .toList())
                    .build();
    }
}
