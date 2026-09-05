import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscar-servicos',
  imports: [FormsModule],
  templateUrl: './buscar-servicos.html',
  styles: ``,
})
export class BuscarServicos {
  public location = inject(Location);

  public back() {
    this.location.back();
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

  termoBusca: string = '';
  buscarServicos() {
    console.log(this.termoBusca);
  }
}
