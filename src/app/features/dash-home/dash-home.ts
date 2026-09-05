import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserRole } from '../model/user-role';

interface OpcaoMenu {
  rota: string;
  icone: string;
  titulo: string;
  descricao: string;
  iconeClass: string;
}

@Component({
  selector: 'app-dash-home',
  imports: [RouterLink],
  templateUrl: './dash-home.html',
  styles: ``,
})
export class DashHome {
  userRole: UserRole = UserRole.SOLICITANTE;
  itemsMenuSolicitante: OpcaoMenu[] = [
    {
      rota: '/agendamentos',
      icone: 'pi-clock',
      titulo: 'Meus Agendamentos',
      descricao: 'Confira seus serviços agendados e gerencie seus horários',
      iconeClass: 'bg-green-50 text-green-500',
    },
    {
      rota: '/buscar-servicos',
      icone: 'pi-th-large',
      titulo: 'Serviços Disponíveis',
      descricao: 'Encontre serviços gratuitos e faça sua inscrição',
      iconeClass: 'bg-purple-50 text-purple-500',
    },
  ];

  itemsMenuPrestador: OpcaoMenu[] = [
    {
      rota: '/meus-servicos',
      icone: 'pi-list',
      titulo: 'Meus Serviços',
      descricao: 'Gerencie os serviços oferecidos',
      iconeClass: 'bg-orange-50 text-orange-500',
    },
    {
      rota: '/criar-servico',
      icone: 'pi-th-large',
      titulo: 'Criar Serviços',
      descricao: 'Crie um serviços para ajudar a comunidade',
      iconeClass: 'bg-blue-50 text-blue-500',
    },
  ];

  get opcoesMenuBaseadoNoUsuario(): OpcaoMenu[] {
    switch (this.userRole) {
      case UserRole.SOLICITANTE:
        return this.itemsMenuSolicitante;

      case UserRole.PRESTADOR:
        return this.itemsMenuPrestador;

      case UserRole.ADMIN:
        return [
          {
            rota: '/usuarios',
            icone: 'pi-users',
            titulo: 'Usuários',
            descricao: 'Gerencie os usuários do sistema',
            iconeClass: 'bg-red-50 text-red-500',
          },
        ];

      default:
        return [];
    }
  }
}
