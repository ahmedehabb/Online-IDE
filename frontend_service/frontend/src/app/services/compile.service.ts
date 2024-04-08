// compile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiClientService } from './api-client.service';

export interface CompileApiResponse {
  stderr: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompileService {
  private compileUrl = '/compile';
  private isMock = false; // Flag to control the mock behavior
  private compileOutputSource = new BehaviorSubject<string>('');
  currentOutput = this.compileOutputSource.asObservable();

  constructor(private apiClientService: ApiClientService) {}

  compileCode(code: string, fileName: any): Observable<any> {
    if (this.isMock) {
      // Mock response
      const mockOutput = `${code}`;
      this.compileOutputSource.next(mockOutput);
      return of({ output: mockOutput });
    } else {
      // Actual HTTP request
      return this.apiClientService.postData(this.compileUrl, { code: code, fileName: fileName }).pipe(
        tap((response: CompileApiResponse) => {
          this.compileOutputSource.next(response.stderr);
        })
      );
    }
  }
}
