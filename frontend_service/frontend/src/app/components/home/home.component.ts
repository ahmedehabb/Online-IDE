import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatButtonModule],

})
export class HomeComponent {
  constructor(private router: Router, public authService : AuthService) {}

  authenticatedNow: boolean = true;
  ngOnInit(): void {
    
    this.authService.authenticated.subscribe(authenticated => {
      console.log('Authentication status changed:', authenticated);
      this.authenticatedNow = authenticated;
    });
  }
}
