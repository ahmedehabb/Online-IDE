import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);

  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  get isDarkMode(): boolean {
    return this.isDarkModeSubject.value;
  }

  private set isDarkMode(value: boolean) {
    this.isDarkModeSubject.next(value);
  }

  constructor() {
    // Initialize SSE connection
    this.connectToSSE();
  }

  connectToSSE() {
    console.log("connectToSSE function !!");
    const eventSource = new EventSource('http://34.125.30.158:8083' + '/dark-mode/connect', { withCredentials: true });
    console.log(eventSource);
    
    eventSource.addEventListener('connect', (event: any) => {
      console.log("connected");
    });
    eventSource.addEventListener('theme-change', (event: any) => {
      this.toggleTheme();
    });
  }

  toggleTheme() {
    if (!this.isDarkMode) {
      //lightMode
      document.documentElement.setAttribute('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('theme');
    }

    this.isDarkMode = !this.isDarkMode;
  }
}
