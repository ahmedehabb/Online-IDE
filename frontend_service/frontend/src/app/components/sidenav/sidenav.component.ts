import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { ApiClientService } from '../../services/api-client.service';
import { TerminalComponent } from '../terminal/terminal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { File } from '../../interfaces/file';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FileDialogComponent } from './file-dialog/file-dialog.component';
import { FileService } from '../../services/file.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    CodeEditorComponent,
    TerminalComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FileDialogComponent,
    MatDialogModule,
    NavbarComponent,
  ],
})
export class SidenavComponent {
  constructor(
    private apiClientService: ApiClientService,
    private dialog: MatDialog,
    public fileService: FileService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @ViewChild('fileDialog') fileDialog!: FileDialogComponent;

  // Use a Map to store the showDropdown state for each file
  showFileDropdownMap: Map<File, boolean> = new Map();

  isDropdownOpened: boolean = false;

  ngOnInit(): void {
    this.loadProject();
  }

  private loadProject() {
    this.route.params.subscribe((params) => {
      const projectId = params['projectId'];
      this.apiClientService
        .getData('/project/' + projectId)
        .subscribe((response: Project) => {
          this.fileService.currentProject = response;
        });
      this.apiClientService
        .getData('/project/' + projectId + '/file')
        .subscribe((response: File[]) => {
          this.fileService.currentProjectFiles = response;
          this.fileService.currentFile = response[0];
          console.log('GET Project: ', response);
        });
    });
  }

  handleFileRightClick(event: MouseEvent, file: File): void {
    event.preventDefault();

    // Close all other dropdowns
    this.showFileDropdownMap.forEach((value, key) => {
      this.showFileDropdownMap.set(key, false);
    });

    // Open the dropdown for the clicked file
    this.showFileDropdownMap.set(file, true);

    this.isDropdownOpened = true;

    this.fileService.updateSelectedFile(file);

    // Attach a click event listener to close the dropdown when clicking outside of it
    const outsideClickListener = (e: MouseEvent) => {
      if (!this.isClickInsideDropdown(e) && !this.isDropdownOpened) {
        this.fileService.updateSelectedFile(null);
        this.fileService.isRenaming = false;
      }
      this.showFileDropdownMap.forEach((value, key) => {
        this.showFileDropdownMap.set(key, false);
      });
      this.isDropdownOpened = false;
      document.removeEventListener('click', outsideClickListener);
    };

    // Add the click event listener
    document.addEventListener('click', outsideClickListener);
  }

  isClickInsideDropdown(event: MouseEvent): boolean {
    const dropdownElement = document.getElementById('dropdown-id');
    return dropdownElement
      ? dropdownElement.contains(event.target as Node)
      : false;
  }

  handleFileClick(event: MouseEvent, file: File): void {
    this.fileService.updateCurrentFile(file);
  }

  deleteFile() {
    if (this.fileService.selectedFile !== null) {
      this.fileService.removeFile(this.fileService.selectedFile);
    }
  }

  openModalToRename() {
    this.fileDialog.openDialog('200ms', '200ms');
    this.fileService.isRenaming = true;
    this.showFileDropdownMap.forEach((value, key) => {
      this.showFileDropdownMap.set(key, false);
    });
  }

  openModalToShare() {
    this.fileDialog.openDialog('200ms', '200ms');
    this.fileService.isSharing = true;
  }

  handleBack() {
    this.router.navigate(['/projects']);
  }
}
