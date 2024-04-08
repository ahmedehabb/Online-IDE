import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private baseURL = 'http://34.125.30.158:8080/api';

  constructor(private http: HttpClient) {}

  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }

  getData(url: string, options?: any): Observable<any> {
    if (!options) {
      options = {}
    }
    options['withCredentials'] = true ;
    return this.http.get(`${this.baseURL}${url}`, options);
  }

  postData(url: string, data: any, options?: any): Observable<any> {
    if (!options) {
      options = {}
    }
    options['withCredentials'] = true ;
    const csrfToken = this.getCookie('XSRF-TOKEN')|| '';

    if (options['headers']) {
      options['headers'].set('Content-Type', 'application/json').set('X-CSRF-TOKEN', csrfToken);
    } else {
      options['headers'] = new HttpHeaders({ 'Content-Type': 'application/json' , 'X-CSRF-TOKEN': csrfToken});
    }
    
    return this.http.post(
      `${this.baseURL}${url}`,
      data,
      options
    );
  }

  updateData(url: string, data: any, options?: any): Observable<any> {

    if (!options) {
      options = {}
    }
    options['withCredentials'] = true ;
    const csrfToken = this.getCookie('XSRF-TOKEN')|| '';

    if (options['headers']) {
      options['headers'].set('Content-Type', 'application/json').set('X-CSRF-TOKEN', csrfToken);
    } else {
      options['headers'] = new HttpHeaders({ 'Content-Type': 'application/json' , 'X-CSRF-TOKEN': csrfToken});
    }
    return this.http.put(
      `${this.baseURL}${url}`,
      data,
      options
    );
  }

  deleteData(url: string, options?: any): Observable<any> {
    if (!options) {
      options = {}
    }
    options['withCredentials'] = true ;
    const csrfToken = this.getCookie('XSRF-TOKEN')|| '';

    if (options['headers']) {
      options['headers'].set('Content-Type', 'application/json').set('X-CSRF-TOKEN', csrfToken);
    } else {
      options['headers'] = new HttpHeaders({ 'Content-Type': 'application/json' , 'X-CSRF-TOKEN': csrfToken});
    }
    return this.http.delete(`${this.baseURL}${url}`, options);
  }
}
