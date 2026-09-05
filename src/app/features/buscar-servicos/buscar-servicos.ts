import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-buscar-servicos',
  imports: [FormsModule, Button],
  templateUrl: './buscar-servicos.html',
  styles: ``,
})
export class BuscarServicos {
  private readonly location = inject(Location);

  termoBusca = '';

  especialidadeSelecionada = '';

  disponibilidadeSelecionada = '';

  especialidades = ['Beleza', 'Saúde', 'Educação', 'Assistência Social'];

  servicos = [
    {
      id: 1,
      servico: 'Corte de cabelo gratuito',
      especialidade: 'Beleza',
      data: '12/09/2026',
      hora: '09:30',
      prestador: 'Carlos Cabelos',
      local: 'Centro Comunitário',
      vagas: 5,
      icone: 'pi pi-user-plus',
      cor: '#c084fc',
    },
    {
      id: 2,
      servico: 'Atendimento odontológico',
      especialidade: 'Saúde',
      data: '12/09/2026',
      hora: '09:30',
      prestador: 'Dra. Camila Horta',
      local: 'UBS Municipal',
      vagas: 2,
      icone: 'pi pi-heart',
      cor: '#7dd3fc',
    },
    {
      id: 3,
      servico: 'Aulas de reforço escolar',
      especialidade: 'Educação',
      data: '12/09/2026',
      hora: '09:30',
      prestador: 'Maria de Sousa',
      local: 'Escola Municipal São Francisco',
      vagas: 0,
      icone: 'pi pi-book',
      cor: '#22c55e',
    },
  ];

  servicosFiltrados = this.servicos;

  back() {
    this.location.back();
  }

  buscarServicos() {
    this.filtrarServicos();
  }

  filtrarServicos() {
    const termo = this.termoBusca.trim().toLowerCase();

    this.servicosFiltrados = this.servicos.filter((servico) => {
      const correspondeBusca =
        !termo ||
        servico.servico.toLowerCase().includes(termo) ||
        servico.prestador.toLowerCase().includes(termo);

      const correspondeEspecialidade =
        !this.especialidadeSelecionada || servico.especialidade === this.especialidadeSelecionada;

      const correspondeDisponibilidade =
        !this.disponibilidadeSelecionada ||
        (this.disponibilidadeSelecionada === 'disponivel' && servico.vagas > 0) ||
        (this.disponibilidadeSelecionada === 'indisponivel' && servico.vagas === 0);

      return correspondeBusca && correspondeEspecialidade && correspondeDisponibilidade;
    });
  }

  inscreverServico(servico: any) {
    console.log('Inscrevendo no serviço:', servico);
  }
}
