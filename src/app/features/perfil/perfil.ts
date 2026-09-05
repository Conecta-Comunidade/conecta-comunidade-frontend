import { Component, inject } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { Location } from '@angular/common';

@Component({
  selector: 'app-perfil',
  imports: [Button],
  templateUrl: './perfil.html',
  styles: ``,
})
export class Perfil {
  private location = inject(Location);

  public back() {
    this.location.back();
  }
}
