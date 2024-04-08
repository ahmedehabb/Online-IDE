package com.onlineide.projectservice.service;

import com.onlineide.projectservice.dto.ErrorResponse;
import com.onlineide.projectservice.dto.FileRequest;
import com.onlineide.projectservice.dto.FileResponse;
import com.onlineide.projectservice.model.File;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import com.onlineide.projectservice.repository.FileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class FileService {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private FileRepository fileRepository;

    public ResponseEntity<?> updateFile(String id, FileRequest fileRequest) {
        try {
            log.info("Updating file with id: {}", id);
            File file = fileRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("File not found with id: " + id));
            if (fileRequest.getFileName() != null)
                file.setName(fileRequest.getFileName());
            if (fileRequest.getCode() != null)
                file.setCode(fileRequest.getCode());
            fileRepository.save(file);
            return ResponseEntity.ok().body(FileResponse.fromFile(file));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    public ResponseEntity<?> deleteFile(String id) {
        try {
            log.info("Deleting file with id: {}", id);
            File file = fileRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("File not found with id: " + id));
            fileRepository.delete(file);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
}
