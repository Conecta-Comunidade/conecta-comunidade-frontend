import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  private router = inject(Router);

  logout(): void {
    sessionStorage.removeItem('conecta-token');
    this.router.navigate(['/']);
  }
}
