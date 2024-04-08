#!/bin/bash

services=("frontend_service" "project" "compiler" "api-gateway" "service-registry" "dark-mode/darkmode")

for service in "${services[@]}"
do
    echo "Compiling and packaging $service"
    cd $service

    if [ "$service" = "frontend_service" ]; then
        cd frontend
        npm install
        ng build --output-path=../src/main/resources/static
        cd ..
    fi

    mvn clean compile
    mvn package -Dphase=package -DskipTests=true
    cd ..
done

echo "All services have been compiled and packaged."