package com.onlineide.projectservice.controller;

import com.onlineide.projectservice.dto.FileRequest;
import com.onlineide.projectservice.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/project/file")
public class FileController {

    @Autowired
    private FileService fileService;
    @PutMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<?> updateFile(@PathVariable String id, @RequestBody FileRequest fileRequest) {
        return fileService.updateFile(id, fileRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<?> deleteFile(@PathVariable String id) {
        return fileService.deleteFile(id);
    }
}
