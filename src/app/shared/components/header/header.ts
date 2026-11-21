import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styles: ``,
})
export class Header implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  private user = this.authService.currentUser();

  ngOnInit(): void {
    console.log(this.user?.name);
    console.log(this.user?.email);
    console.log(this.user?.role);
  }

  logout(): void {
    sessionStorage.removeItem('conecta-token');
    this.router.navigate(['/']);
  }
}
