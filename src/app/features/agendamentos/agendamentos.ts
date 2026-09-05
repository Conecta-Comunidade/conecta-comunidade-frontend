import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../../shared/components/button/button';
import { ButtonIcon } from 'primeng/button';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agendamentos',
  imports: [Button, ButtonIcon],
  templateUrl: './agendamentos.html',
  styles: ``,
})
export class Agendamentos {
  private router = inject(Router);
  private location = inject(Location);

  public back() {
    this.location.back();
  }

  public goToAgendamento() {
    this.router.navigateByUrl('/buscar-servicos');
  }

  agendamentos = [
    {
      id: 1,
      servico: 'Corte de cabelo gratuito',
      data: '12/09/2026',
      hora: '09:30',
      prestador: 'Carlos Cabelos',
      local: 'Centro Comunitário',
      icone: 'pi pi-user-plus',
      cor: '#c084fc',
    },
    {
      id: 2,
      servico: 'Atendimento odontológico',
      data: '12/09/2026',
      hora: '09:30',
      prestador: 'Dr Camila Horta',
      local: 'UBS Municipal',
      icone: 'pi pi-heart',
      cor: '#7dd3fc',
    },
    {
      id: 3,
      servico: 'Aulas de reforço escolar',
      data: '12/09/2026',
      hora: '09:30',
      prestador: 'Maria de Sousa',
      local: 'Escola Municipal São Francisco',
      icone: 'pi pi-book',
      cor: '#22c55e',
    },
  ];
}
