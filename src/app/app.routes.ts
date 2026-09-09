import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
    title: 'Login',
  },

  {
    path: 'cadastro',
    loadComponent: () => import('./features/auth/cadastro/cadastro').then((m) => m.Cadastro),
    title: 'Cadastro',
  },

  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/dash-home/dash-home').then((m) => m.DashHome),
        title: 'Pagina Inicial',
      },
      {
        path: 'perfil',
        loadComponent: () => import('./features/perfil/perfil').then((m) => m.Perfil),
        title: 'Perfil',
      },
      {
        path: 'agendamentos',
        loadComponent: () =>
          import('./features/agendamentos/agendamentos').then((m) => m.Agendamentos),
        title: 'Agendamentos',
      },
      {
        path: 'buscar-servicos',
        loadComponent: () =>
          import('./features/buscar-servicos/buscar-servicos').then((m) => m.BuscarServicos),
        title: 'Buscar Serviços',
      },
      {
        path: 'criar-servico',
        loadComponent: () =>
          import('./features/criar-servico/criar-servico').then((m) => m.CriarServico),
        title: 'Criar Serviços',
      },
    ],
  },
];
