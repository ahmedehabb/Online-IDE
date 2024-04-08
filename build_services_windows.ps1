$services = "frontend_service", "project", "compiler", "api-gateway", "service-registry", "dark-mode/darkmode"

foreach ($service in $services) {
    Write-Host "Compiling and packaging $service"
    Set-Location $service

    if ($service -eq "frontend_service") {
        Set-Location frontend
        npm install
        ng build --output-path=../src/main/resources/static
        Set-Location ..
    }

    mvn clean compile
    mvn package -Dphase=package -DskipTests=true
    Set-Location ..
}

Write-Host "All services have been compiled and packaged."