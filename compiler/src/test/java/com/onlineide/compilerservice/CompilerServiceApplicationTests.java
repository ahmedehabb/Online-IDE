package com.onlineide.compilerservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.onlineide.compilerservice.model.SourceCode;
import com.onlineide.compilerservice.service.CompilerService;

@SpringBootTest
class CompilerServiceApplicationTests {

	@Autowired
	CompilerService compilerService;

	@Test
	void contextLoads() {
	}

	@Test
    public void testValidJavaCodeCompilation() {

        // Given
        SourceCode sourceCode = new SourceCode(
            "public class App{public static void main(String[] args) {System.out.println(\"Hello World!\");}}",
            "App.java",
			"",
			"",
			false
        );
        
        // When
        SourceCode compiledCode = compilerService.compile(sourceCode);

        // Then
        assertTrue(compiledCode.isCompilable());
        assertEquals("", compiledCode.getStdout());
        assertEquals("", compiledCode.getStderr());
		assertEquals("App.java", compiledCode.getFileName());
    }

    @Test
    public void testInvalidJavaCodeCompilation() {
		
		// Given
        SourceCode sourceCode = new SourceCode(
            "public class App{public static void main(String[] args) {System.out.println(\"Hello World!\")}}",
            "App.java",
			"",
			"",
			false
        );
        
        // When
        SourceCode compiledCode = compilerService.compile(sourceCode);
        
        // Then
        assertFalse(compiledCode.isCompilable());

		// The expected error message structure, ignoring dynamic file paths
        String expectedErrorMessage = "error: ';' expected\n" +
									  "public class App{public static void main(String[] args) {System.out.println(\"Hello World!\")}}\n" + 
									  "                                                                                           ^\n" +
									  "1 error\n";
		// Verify that the error message contains the expected structure (ignoring specific file paths)
        assertTrue(compiledCode.getStderr().contains(expectedErrorMessage));
        assertEquals("", compiledCode.getStdout());
		assertEquals("App.java", compiledCode.getFileName());
    }

    @Test
    public void testValidCCodeCompilation() {

        // Given
        SourceCode sourceCode = new SourceCode(
            "#include <stdio.h>\nint main() {\n  printf(\"Hello, World!\\n\");\n  return 0;\n}",
            "App.c",
            "",
            "",
            false
        );
        
        // When
        SourceCode compiledCode = compilerService.compile(sourceCode);
        
        // Then
        assertTrue(compiledCode.isCompilable());
        assertEquals("", compiledCode.getStdout());
        assertEquals("", compiledCode.getStderr());
        assertEquals("App.c", compiledCode.getFileName());
    }

    @Test
    public void testInvalidCCodeCompilation() {
        
		// Given
        SourceCode sourceCode = new SourceCode(
            "#include <stdio.h>\nint main() {\n  printf(\"Hello, World!\\n\")\n  return 0;\n}",
            "App.c",
            "",
            "",
            false
        );
        
        // When
        SourceCode compiledCode = compilerService.compile(sourceCode);
        
        // Then
        assertFalse(compiledCode.isCompilable());
        // !! Different compilers have different outputs, therefore commenting this out for now.
        // // Assert error message with substring matching to ignore specific file paths
        // String expectedErrorMessage = "error: expected ';' after expression\n" + 
		// 							  "  printf(\"Hello, World!\\n\")\n" + 
		// 							  "                           ^\n" + 
		// 							  "                           ;\n" +
		// 							  "1 error generated.\n";
        // assertTrue(compiledCode.getStderr().contains(expectedErrorMessage));
        assertEquals("", compiledCode.getStdout());
        assertEquals("App.c", compiledCode.getFileName());
    }

}
