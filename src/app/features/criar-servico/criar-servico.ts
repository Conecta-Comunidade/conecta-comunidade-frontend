import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from '../../shared/components/button/button';
import { Location } from '@angular/common';

@Component({
  selector: 'app-criar-servico',
  standalone: true,
  imports: [FormsModule, RouterLink, Button],
  templateUrl: './criar-servico.html',
  styles: ``,
})
export class CriarServico {
  private location = inject(Location);

  public back() {
    this.location.back();
  }
  servicoForm = {
    servico: '',
    data: '',
    horario: '',
    local: '',
    vagas: 1,
    descricao: '',
  };

  criarServico() {
    console.log(this.servicoForm);
  }
}
