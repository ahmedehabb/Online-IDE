package com.onlineide.compilerservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SourceCode {
    private String code;
    private String fileName;
    private String stdout;
    private String stderr;
    private boolean compilable = false;
}
