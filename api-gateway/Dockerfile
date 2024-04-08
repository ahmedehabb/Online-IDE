FROM maven:3.8.3-openjdk-17

COPY target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]