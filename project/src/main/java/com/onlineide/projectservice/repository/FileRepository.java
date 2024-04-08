package com.onlineide.projectservice.repository;

import com.onlineide.projectservice.model.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<File, String> {
}
