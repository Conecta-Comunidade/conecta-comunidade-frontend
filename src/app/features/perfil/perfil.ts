import { Component, inject } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { Location, TitleCasePipe } from '@angular/common';
import { AuthService } from '../auth/services/auth';

@Component({
  selector: 'app-perfil',
  imports: [Button, TitleCasePipe],
  templateUrl: './perfil.html',
  styles: ``,
})
export class Perfil {
  private location = inject(Location);
  private authService = inject(AuthService);
  user = this.authService.currentUser();

  public back() {
    this.location.back();
  }
}
