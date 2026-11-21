import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenStorageService } from '../../../features/auth/services/token-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styles: ``,
})
export class Header {
  private router = inject(Router);
  private readonly tokenStorage = inject(TokenStorageService);

  logout(): void {
    this.tokenStorage.removeToken();
    this.router.navigate(['/']);
  }
}
