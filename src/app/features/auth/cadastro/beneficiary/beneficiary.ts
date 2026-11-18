import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Router, RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { AuthService } from '../../services/auth';
import { UserRole } from '../../../model/user-role';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';
import { output } from '@angular/core';

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.html',
  imports: [
    ReactiveFormsModule,
    MessageModule,
    InputTextModule,
    PasswordModule,
    RouterLink,
    Button,
    ToastModule,
  ],
  styles: ``,
})
export class Beneficiary {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  isTabDisabled = output<boolean>();

  lockTabs(isDisabled: boolean): void {
    this.isTabDisabled.emit(isDisabled);
  }

  formSubmitted = false;

  cadastroForm: FormGroup = this.fb.group(
    {
      name: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/)]],

      confirmarPassword: ['', Validators.required],
    },
    {
      validators: this.passwordMatchValidator,
    },
  );

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmarPassword = form.get('confirmarPassword')?.value;

    if (password !== confirmarPassword) {
      form.get('confirmarPassword')?.setErrors({
        ...form.get('confirmarPassword')?.errors,
        passwordMismatch: true,
      });

      return { passwordMismatch: true };
    }

    const errors = form.get('confirmarPassword')?.errors;

    if (errors?.['passwordMismatch']) {
      delete errors['passwordMismatch'];

      if (Object.keys(errors).length === 0) {
        form.get('confirmarPassword')?.setErrors(null);
      } else {
        form.get('confirmarPassword')?.setErrors(errors);
      }
    }

    return null;
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.cadastroForm.invalid) {
      return;
    }

    const { confirmarPassword, ...cadastroData } = this.cadastroForm.value;

    const data = {
      ...cadastroData,
      role: UserRole.BENEFICIARY,
    };

    this.lockTabs(true);
    this.authService.register(data).subscribe({
      next: () => this.handleRegisterSuccess(),
      error: (error: HttpErrorResponse) => this.handleRegisterError(error),
    });
  }

  private handleRegisterSuccess(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Cadastro realizado com sucesso!',
    });

    this.cadastroForm.reset();
    this.formSubmitted = false;

    this.slowRedirectToLoginPage();
  }

  private handleRegisterError(error: HttpErrorResponse): void {
    const response = error.error as ErrorDTOResponse;

    const fieldErrors = response.fieldErrors?.map((field) => field.message).join('\n');

    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: [response.message, fieldErrors].filter(Boolean).join('\n'),
    });
    this.lockTabs(false);
    this.formSubmitted = false;
  }

  private slowRedirectToLoginPage(): void {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }

  isInvalid(controlName: string): boolean {
    const control = this.cadastroForm.get(controlName);

    return !!(control?.invalid && (control.touched || this.formSubmitted));
  }

  clearForm(): void {
    this.cadastroForm.reset();
    this.formSubmitted = false;
  }
}
