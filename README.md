# OnlineIDE - Project for Advanced Topics of Software Engineering


# Project Specification – OnlineIDE
## Motivation

An integrated development environment (IDE) provides programmers typically with at least a source code editor, project file management, and capabilities to compile and/or interpret source code. Most modern IDEs furthermore have build automation tools, a debugger, and version control systems integrated. IDEs can be language-specific or support multiple languages. Intentions behind using an IDE can be for example:
• Reduction of the necessary configuration, e.g. link and install multiple development utilities, by using one cohesive unit
• Graphical user interface (GUI) which can simplify and sometimes accelerate the development process
• Tighter integration of code with productivity tools, e.g. continuous parsing of code providing instant feedback or GUI builders

However, when using an IDE you will often still need certain compilers or interpreters installed to work with it properly, and you may need to update your IDE regularly in order to stay up-to-date. Therefore, it can be desirable to even reduce this effort with a web-based IDE, where necessary tools, programming languages or features come prepackaged and always at the newest version.

## OnlineIDE
You and your team will implement your own web-based IDE (OnlineIDE), where users can write source code in a web application, organize source code files, and compile the code and display output (e.g. error messages) from the compiler operated on a remote server (see the big picture in Figure 1). The users do not need to install any programs or files or configure their development machines to start new projects. Find some inspiration at https://ide.cs50.io/, https://aws.amazon.com/cloud9/, https://www.gitpod.io/ or https://theia-ide. org/.

# The full Specification

[Project Specification - OnlineIDE.pdf](https://github.com/ahmedehabb/Online-IDE/files/14911575/Project.Specification.-.OnlineIDE.pdf)


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Add your files

- Clone the project directory:
- Clone the project directory:

```
cd existing_repo
git clone https://gitlab.lrz.de/ase23-seehamer-see/onlineide.git
```

## Build and run the microservices locally

- Run the following command in all the project directories in separate terminals to build  and start each service:
(e.g., `cd onlineide/backend`): \
PS: for darkmode it is `dark-mode/darkmode`

```
mvn clean compile 
mvn package
mvn spring-boot:run
```

## Build and run the microservices in docker containers

- Alternatively you can run all services also in local docker containers.
Start by running the script `build_services.sh` after setting ``chmod+x`` if you use linux OR `build_services_windows.ps1` if you use Windows.


- Once all the services are compiled and packaged, run the following commands to start the services in local docker containers.
```
docker-compose build # To build the images
docker-compose up    # To start the containers
```

## Test and Deploy

Use the built-in continuous integration in GitLab.

To  test the project in gitlab, triggering a change in a branch or manually triggering a pipeline will test the services.
If the pipeline is triggered on the main branch, all the microservices will be deployed to he GCP instance upon success (Address: http://34.125.30.158)

The frontend runs on port ``8084`` (or ``http://34.125.30.158:8084``)


***Important:***
Since we didn't have credits to run the pipelines using a cloud instance, we used a local (`Windows`) gitlab runner (can be found here: `https://gitlab.lrz.de/ase23-seehamer-see/onlineide/-/settings/ci_cd`). 
This means the personal laptop needs to be running when you want to test and deploy changes.

***

To  test the project in gitlab, triggering a change in a branch or manually triggering a pipeline will test the services.
If the pipeline is triggered on the main branch, all the microservices will be deployed to he GCP instance upon success (Address: http://34.125.30.158)

The frontend runs on port ``8084`` (or ``http://34.125.30.158:8084``)


***Important:***
Since we didn't have credits to run the pipelines using a cloud instance, we used a local (`Windows`) gitlab runner (can be found here: `https://gitlab.lrz.de/ase23-seehamer-see/onlineide/-/settings/ci_cd`). 
This means the personal laptop needs to be running when you want to test and deploy changes.

***


## License
For open source projects, say how it is licensed.

## Project status
The project is submitted as part of bonus exercise of the `Advanced Topics of Software Engineering` lecture.
The project is submitted as part of bonus exercise of the `Advanced Topics of Software Engineering` lecture.
