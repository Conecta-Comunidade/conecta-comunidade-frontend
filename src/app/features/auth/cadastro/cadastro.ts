import { Component, inject } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TabsModule } from 'primeng/tabs';
import { Contributor } from './contributor/contributor';
import { Beneficiary } from './beneficiary/beneficiary';

@Component({
  selector: 'app-cadastro',
  imports: [
    ReactiveFormsModule,
    MessageModule,
    ToastModule,
    InputTextModule,
    PasswordModule,
    Contributor,
    TabsModule,
    Beneficiary,
  ],
  templateUrl: './cadastro.html',
})
export class Cadastro {
  tabs: 'BENEFICIARY' | 'CONTRIBUTOR' = 'BENEFICIARY';
}
