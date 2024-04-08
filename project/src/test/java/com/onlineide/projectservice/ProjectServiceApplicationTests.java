package com.onlineide.projectservice;

import com.onlineide.projectservice.dto.ErrorResponse;
import com.onlineide.projectservice.dto.ProjectResponse;
import com.onlineide.projectservice.model.Project;
import com.onlineide.projectservice.model.User;
import com.onlineide.projectservice.repository.ProjectRepository;
import com.onlineide.projectservice.service.ProjectService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
class ProjectServiceApplicationTests {

	@InjectMocks
	private ProjectService projectService;

	@Mock
	private ProjectRepository projectRepository;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void contextLoads() {
	}

	@Test
	@DisplayName("getAllProjects returns list of projects when projects exist")
	void getAllProjectsReturnsListOfProjectsWhenProjectsExist() {
		// Given
		String userName = "testUser";
		User user = new User();
		user.setUsername(userName);

		Project project1 = new Project();
		project1.setName("Project 1");
		project1.getUsers().add(user);

		Project project2 = new Project();
		project2.setName("Project 2");
		project2.getUsers().add(user);

		List<Project> projects = Arrays.asList(project1, project2);
		when(projectRepository.findAll()).thenReturn(projects);

		// When
		ResponseEntity<?> response = projectService.getAllProjects(userName);

		// Then
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(ProjectResponse.fromProjects(projects), response.getBody());
	}

	@Test
	@DisplayName("getAllProjects returns error response when exception is thrown")
	void getAllProjectsReturnsErrorResponseWhenExceptionIsThrown() {
		// Given
		String userName = "testUser";
		when(projectRepository.findAll()).thenThrow(new RuntimeException("Unexpected error"));

		// When
		ResponseEntity<?> response = projectService.getAllProjects(userName);

		// Then
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
		assertEquals(new ErrorResponse("error getting projects: Unexpected error"), response.getBody());
	}
}
