import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FileService } from 'src/app/services/file.service';
import { File } from 'src/app/interfaces/file';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project';
import { ApiClientService } from 'src/app/services/api-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatButtonModule, NavbarComponent],
})
export class ProjectsSectionComponent {
  isEditable: boolean = false;
  projects: Project[] = [];
  showUserIds: boolean = false;
  errorMessage: string = '';

  @Output() projectNameEdited: EventEmitter<string> =
    new EventEmitter<string>();

  onCellHover(shouldEdit: boolean, project: Project): void {
    this.isEditable = shouldEdit;
    project.isEditable = shouldEdit;
  }

  onClickUsers() {
    this.showUserIds = !this.showUserIds;
  }

  private userId : any = ""

  constructor(
    private fileService: FileService,
    private router: Router,
    private apiClientService: ApiClientService,
  ) {}

  ngOnInit(): void {
    let options = {};
    this.apiClientService.getData('/user').pipe(
      catchError(() => {
        this.errorMessage = 'Server Error occurred!';
        return "";
      })
    ).subscribe((response: any) => {
      this.userId = response['userId'];
      this.loadProjects();
    });
  }

  private loadProjects() {
    this.apiClientService
      .getData('/project/getAll/' + this.userId )
      .pipe(
        catchError(() => {
          this.errorMessage = 'Server Error occurred!';
          return [];
        })
      )
      .subscribe((response: Project[]) => {
        this.projects = response;
      });
  }

  addProject(): void {
    const newProjectId = this.generateUniqueProjectId();
    const newProjectName = `Project_${newProjectId}`;

    this.apiClientService
      .postData('/project/' + this.userId, { name: newProjectName })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorMessage =
            error.error?.message ||
            'An unexpected error occurred. Please try again.';
          return of(null);
        })
      )
      .subscribe((response: Project | null) => {
        if (response) {
          this.projects.push(response);
          this.errorMessage = '';
        }
      });
  }

  isProjectNameUnique(newName: string, currentProjectId: string): boolean {
    return !this.projects.some(
      (project) => project.name === newName && project.id !== currentProjectId
    );
  }

  private generateUniqueProjectId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const idLength = 10; // You can adjust the length of the random string as needed
    let randomId = '';
  
    do {
      for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters[randomIndex];
      }
    } while (this.projects.some((project) => project.id === randomId));
  
    return randomId;
  }

  renameProject(project: Project, projectName: HTMLInputElement): void {
    if (!this.isProjectNameUnique(project.name, project.id)) {
      this.errorMessage = 'Name already exists!';
      projectName.classList.add('error');
      projectName.focus();
      return;
    }

    project.isEditable = false;
    this.isEditable = false;
    this.apiClientService
      .updateData('/project/' + project.id, { name: project.name })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorMessage =
            error.error?.message ||
            'An unexpected error occurred. Please try again.';
          return of(null);
        })
      )
      .subscribe((response: Project | null) => {
        if (response) {
          this.errorMessage = '';
          projectName.classList.remove('error');
          project.hasErrors = false;
          this.loadProjects();
        }
      });
  }

  openProject(project: Project): void {
    if (!project.hasErrors) {
      this.router.navigate(['/editor/' + project.id]);
    }
  }

  deleteProject(projectId: string): void {
    this.apiClientService
      .deleteData('/project/' + projectId)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorMessage =
            error.error?.message ||
            'An unexpected error occurred while trying to delete the project. Please try again.';
          return of(null);
        })
      )
      .subscribe(() => {
        this.projects = this.projects.filter(
          (project) => project.id !== projectId
        );
        this.errorMessage = '';
      });
  }
}
