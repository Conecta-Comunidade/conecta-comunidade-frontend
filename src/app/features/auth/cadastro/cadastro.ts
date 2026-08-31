import { Component, inject } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Solicitante } from './solicitante/solicitante';
import { TabsModule } from 'primeng/tabs';
import { Prestador } from './prestador/prestador';

@Component({
  selector: 'app-cadastro',
  imports: [
    ReactiveFormsModule,
    MessageModule,
    ToastModule,
    InputTextModule,
    PasswordModule,
    Solicitante,
    TabsModule,
    Prestador,
  ],
  templateUrl: './cadastro.html',
})
export class Cadastro {
  tabs: 'SOLICITANTE' | 'PRESTADOR' = 'SOLICITANTE';
}
