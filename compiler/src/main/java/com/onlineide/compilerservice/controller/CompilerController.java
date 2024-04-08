package com.onlineide.compilerservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.onlineide.compilerservice.model.SourceCode;
import com.onlineide.compilerservice.service.CompilerService;

@RestController
public class CompilerController {

    @Autowired
    private CompilerService compilerService;

    @RequestMapping(path = "/api/compile", method = RequestMethod.POST) public SourceCode compile(@RequestBody SourceCode sourceCode) {
    return compilerService.compile(sourceCode);
    }

}
