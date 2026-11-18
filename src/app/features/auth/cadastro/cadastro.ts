import { Component, viewChild } from '@angular/core';
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
  isBeneficiaryDisabled = false;
  isContributorDisabled = false;

  tabs: 'BENEFICIARY' | 'CONTRIBUTOR' = 'BENEFICIARY';

  beneficiary = viewChild(Beneficiary);
  contributor = viewChild(Contributor);

  onTabLockChange(tab: 'BENEFICIARY' | 'CONTRIBUTOR', isDisabled: boolean): void {
    if (tab === 'BENEFICIARY') {
      this.isContributorDisabled = isDisabled;
    } else {
      this.isBeneficiaryDisabled = isDisabled;
    }
  }

  onTabChange(tab: string | number | undefined): void {
    if (tab !== 'BENEFICIARY' && tab !== 'CONTRIBUTOR') {
      return;
    }

    if (tab === this.tabs) return;

    if (this.tabs === 'BENEFICIARY') {
      this.beneficiary()?.clearForm();
    } else {
      this.contributor()?.clearForm();
    }

    this.tabs = tab;
  }
}
