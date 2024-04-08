import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { FileService } from 'src/app/services/file.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
})
export class FileDialogComponent {
  constructor(public dialog: MatDialog, private fileService: FileService) {}

  createFile() {
    this.fileService.updateSelectedFile(null);
    this.openDialog('200ms', '200ms');
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(DialogAnimationsDialog, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      position: {
        top: '10%',
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fileService.isRenaming = false;
      this.fileService.isSharing = false;
      this.fileService.updateSelectedFile(null);
    });
  }
}

@Component({
  standalone: true,
  selector: 'dialog-animations-dialog',
  templateUrl: 'file-dialog-template.html',
  styleUrls: ['file-dialog-template.css'],
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
  ],
})
export class DialogAnimationsDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogAnimationsDialog>,
    public fileService: FileService,
    private router: Router
  ) {}

  selectedFileName: string = this.fileService.selectedFile
    ? this.fileService.selectedFile.fileName
    : '';

  private createFile(name: string) {
    this.fileService.addFile(name);
  }

  private renameFile(newName: string, code: string) {
    if (this.fileService.selectedFile !== null) {
      this.fileService.renameFile(this.fileService.selectedFile, newName, code);
      this.fileService.isRenaming = false;
    }
  }

  private shareProject(username: string) {
    this.fileService.shareProject(username);
    this.fileService.isSharing = false;
    this.router.navigate(['/projects']);
  }

  performAction(inputValue: string, code: string): void {
    if (this.fileService.isRenaming) {
      this.renameFile(inputValue, code);
    } else if (this.fileService.isSharing) {
      this.shareProject(inputValue);
    } else {
      this.createFile(inputValue);
    }
    // Close the dialog after either creating or renaming
    this.fileService.isRenaming = false;
    this.fileService.isSharing = false;
    this.fileService.updateSelectedFile(null);
    this.dialogRef.close();
  }
}
