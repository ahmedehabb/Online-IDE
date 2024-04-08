package com.onlineide.compilerservice.service;

import org.springframework.stereotype.Service;

import com.onlineide.compilerservice.model.SourceCode;

import java.io.*;

@Service
public class CompilerService {

    public SourceCode compile(SourceCode sourceCode) {
        String code = sourceCode.getCode();
        String fileName = sourceCode.getFileName();

        if (fileName == null || code == null) {
            sourceCode.setStderr("Invalid file name or code provided");
            sourceCode.setCompilable(false);
            return sourceCode;
        }

        if (fileName.endsWith(".java")) {
            compileFile(sourceCode, "javac");
        } else if (fileName.endsWith(".c")) {
            compileFile(sourceCode, "gcc", "-o", "output");
        } else {
            sourceCode.setStderr("Unsupported file type");
            sourceCode.setCompilable(false);
        }

        return sourceCode;
    }

    private void compileFile(SourceCode sourceCode, String compiler, String... options) {
        String code = sourceCode.getCode();
        String fileName = sourceCode.getFileName();

        try {
            // Create a temporary file to write the source code
            File tempFile = new File(fileName);
            FileWriter fileWriter = new FileWriter(tempFile);
            fileWriter.write(code);
            fileWriter.close();

            // Command to execute compilation using specified compiler and options
            String[] compileCmd = new String[options.length + 2];
            compileCmd[0] = compiler;
            compileCmd[1] = tempFile.getAbsolutePath();
            System.arraycopy(options, 0, compileCmd, 2, options.length);

            // Execute compilation command
            Process compileProcess = Runtime.getRuntime().exec(compileCmd);

            // Capture output streams (stdout and stderr)
            InputStream inputStream = compileProcess.getInputStream();
            InputStream errorStream = compileProcess.getErrorStream();

            // Read stdout and stderr
            String stdout = readStream(inputStream);
            String stderr = readStream(errorStream);

            // Get compilation result
            int compilationResult = compileProcess.waitFor();

            // Update SourceCode properties based on compilation result
            sourceCode.setStdout(stdout);
            sourceCode.setStderr(stderr);
            sourceCode.setCompilable(compilationResult == 0);

            // Delete the temporary file after compilation
            if (tempFile.exists()) {
                tempFile.delete();
            }

            // Delete the generated .class file after compilation
            if (fileName.endsWith(".java")) {
                String classFileName = fileName.substring(0, fileName.lastIndexOf('.')) + ".class";
                File classFile = new File(classFileName);
                if (classFile.exists()) {
                    classFile.delete();
                }
            }

            //Delete the output file after compilation
            File outputFile = new File("output.exe");
            if (outputFile.exists()) {
               outputFile.delete();
            }

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            // Handle exceptions if needed
        }
    }

    // Helper method to read input stream and convert to String
    private String readStream(InputStream inputStream) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line).append("\n");
        }
        return stringBuilder.toString();
    }
}
