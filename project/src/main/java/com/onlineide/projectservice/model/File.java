package com.onlineide.projectservice.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "files")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class File {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    @Column(name = "user_id")
    private String id;
    @Column(name = "name")
    private String name;
    @Column(name = "code")
    private String code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;
}
