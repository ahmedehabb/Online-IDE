import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThemeService } from 'src/app/services/theme.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule,
  ],
})
export class NavbarComponent {
  constructor(private router: Router, private themeService: ThemeService, public authService: AuthService) {}


  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
