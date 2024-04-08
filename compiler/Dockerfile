# Start with a base image containing Java runtime (OpenJDK-17)
FROM openjdk:17-slim

# Update the package lists, upgrade the system, and Install Maven and GCC
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y maven gcc

# Confirm installations
RUN java -version && mvn -version && gcc --version

COPY target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
