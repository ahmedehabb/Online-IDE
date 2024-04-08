package com.onlineide.projectservice.dto;

import com.onlineide.projectservice.model.File;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FileResponse {

    private String id;
    private String fileName;
    private String code;
    private ProjectResponse project;

    public static List<FileResponse> fromFiles(List<File> files) {

        return files.stream()
                .map(file -> FileResponse.builder()
                        .id(file.getId())
                        .fileName(file.getName())
                        .code(file.getCode() == null ? "" : file.getCode())
                        .project(ProjectResponse.fromProject(file.getProject()))
                        .build())
                .toList();
    }

    public static FileResponse fromFile(File file) {

            return FileResponse.builder()
                    .id(file.getId())
                    .fileName(file.getName())
                    .code(file.getCode() == null ? "" : file.getCode())
                    .project(ProjectResponse.fromProject(file.getProject()))
                    .build();
    }
}
