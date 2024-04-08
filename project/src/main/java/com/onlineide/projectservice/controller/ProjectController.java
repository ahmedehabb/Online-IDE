package com.onlineide.projectservice.controller;

import com.onlineide.projectservice.dto.FileResponse;
import com.onlineide.projectservice.dto.ProjectRequest;
import com.onlineide.projectservice.dto.ProjectResponse;
import com.onlineide.projectservice.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("/{userId}")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<?> createProject(
            @RequestBody Map<String, String> projectRequest,
            @PathVariable String userId) {

        return projectService.createProject(projectRequest.get("name"), userId);
    }

    @GetMapping("/getAll/{userId}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<?> getAllProjects(@PathVariable String userId) {

        return projectService.getAllProjects(userId);
    }

    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<?> getProjectById(@PathVariable String id) {

        return projectService.getProjectById(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<?> updateProjectName(@PathVariable String id, @RequestBody ProjectRequest projectRequest) {

        return projectService.updateProjectName(id, projectRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<?> deleteProject(@PathVariable String id) {

        return projectService.deleteProject(id);
    }

    @PutMapping("/{id}/share")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<?> addUserToProject(@PathVariable String id, @RequestBody Map<String, String> userRequest) {

        return projectService.addUserToProject(id, userRequest.get("username"));
    }

    @PostMapping("/{id}/file")
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<?> addFileToProject(@PathVariable String id, @RequestBody Map<String, String> fileRequest) {

        return projectService.addFileToProject(id, fileRequest.get("fileName"));
    }

    @GetMapping("/{id}/file")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<?> getFilesFromProject(@PathVariable String id) {

        return projectService.getFilesFromProject(id);
    }
}
