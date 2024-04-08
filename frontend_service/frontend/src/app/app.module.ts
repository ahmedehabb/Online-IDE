import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet, provideRouter } from '@angular/router';
import { routes } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MonacoEditorModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent],
})
export class AppModule {}
