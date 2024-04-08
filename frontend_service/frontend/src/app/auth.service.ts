import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { environment } from '../environments/environment';

const LOGIN_PATH = '/login'; 
const LOGOUT_PATH = '/logout';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  // Use localhost if run locally
  private apiUrl: string = environment.url;
  private authenticated$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public get authenticated(): ReplaySubject<boolean> { 
    return this.authenticated$;
  }
  constructor(private httpClient: HttpClient, private router: Router) {
    this.checkAuthentication();     
  }

  public checkAuthentication(): void { 
    this.httpClient.get<boolean>(`${this.apiUrl}:8080/authenticated`, { withCredentials: true })
    .subscribe((authenticated) => { 
      this.authenticated$.next(authenticated);
      console.log("authenticated" , authenticated);
      
    }, (err) => { 
      this.authenticated$.next(false);
      console.log("err", err);
      console.log("authenticated" , this.authenticated$);

    }); 
  }
  
  // public login(): void {
  //   window.location.href = `${window.location.origin}${LOGIN_PATH}`; // handled by backend
  // }

  
  public logout(): void {
    const csrfToken = this.getCookie('XSRF-TOKEN')|| '';
    
    this.httpClient.post(`${this.apiUrl}:8080/logout`, {}, { withCredentials: true,  responseType: 'text'})
    .subscribe(() => {
      console.log("logged out successfully");
      // Handle successful logout (if needed)
      this.router.navigate(['/']); // Navigate to home page after logout
      this.checkAuthentication();
    },
    (err) => {
      console.log("error during logout", err);
      // Handle error during logout
    });
  }


  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }

  public login(): void {
    console.log('Initiating OAuth 2.0 login flow');
    const authorizationUrl = `${this.apiUrl}:8080/oauth2/authorization/gitlab?redirect_url=${this.apiUrl}:8084/`;
    window.location.href = authorizationUrl;
  }
}