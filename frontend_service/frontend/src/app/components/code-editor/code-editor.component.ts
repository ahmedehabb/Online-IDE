import { Component, OnDestroy, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { CompileService } from '../../services/compile.service';
import { FileService } from 'src/app/services/file.service';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { File } from 'src/app/interfaces/file';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css'],
  standalone: true,
  imports: [
    MonacoEditorModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
})
export class CodeEditorComponent implements OnDestroy {
  private fileSubscription: Subscription;
  private isDarkModeSubscription: Subscription;

  private isDarkMode: boolean = false;

  editorOptions: { theme: string; language: string } = {
    theme: 'vs-light',
    language: 'javascript',
  };
  code: string = this.fileService.currentFile?.code ?? '';

  initialCode: string = this.fileService.currentFile?.code ?? '';

  isFileSaved: boolean = true;

  constructor(
    private compileService: CompileService,
    private fileService: FileService,
    private themeService: ThemeService,
    private apiClientService: ApiClientService
  ) {
    // Subscribe to changes in currentFile
    this.fileSubscription = this.fileService.currentFile$.subscribe((file) => {
      this.updateEditorOptions(file);
    });
    // Subscribe to changes in isDarkMode
    this.isDarkModeSubscription = this.themeService.isDarkMode$.subscribe(
      () => {
        // React to changes in isDarkMode
        this.updateEditorOptions(this.fileService.currentFile);
      }
    );
  }

  private updateEditorOptions(file: File | null): void {
    this.code = file?.code ?? '';
    this.initialCode = file?.code ?? '';
    this.isDarkMode = this.themeService.isDarkMode;

    this.editorOptions = {
      theme: this.isDarkMode ? 'vs-dark' : 'vs-light',
      language: this.getLanguage(),
    };
  }

  private getLanguage() {
    const fileExtension = this.fileService.currentFile?.fileName.split('.')[1];
    switch (fileExtension) {
      case 'js':
        return 'javascript';
      case 'py':
        return 'python';
      case 'java':
        return 'java';
      case 'c':
        return 'c';
      case 'cpp':
        return 'cpp';
      default:
        return '';
    }
  }

  handleCodeChange() {
    if (this.initialCode != this.code) {
      this.isFileSaved = false;
    } else {
      this.isFileSaved = true;
    }
  }

  save() {
    const fileId = this.fileService.currentFile?.id;
    this.apiClientService
      .updateData(`/project/file/${fileId}`, { code: this.code })
      .subscribe((response) => {
        console.log('FILE saved');
        console.log(response);
        this.isFileSaved = true;
        this.initialCode = this.code;
      });
  }

  compile() {
    this.compileService.compileCode(this.code, this.fileService.currentFile?.fileName).subscribe({
      next: (response) => {
        console.log('Compilation successful:', response);
      },
      error: (error) => {
        console.error('Compilation error:', error);
      },
    });
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    this.fileSubscription.unsubscribe();
    this.isDarkModeSubscription.unsubscribe();
  }
}
