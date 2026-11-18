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

  formSubmitted = false;

  CadastroForm: FormGroup = this.fb.group(
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
    const senha = form.get('senha')?.value;
    const confirmarSenha = form.get('confirmarSenha')?.value;

    if (senha !== confirmarSenha) {
      form.get('confirmarSenha')?.setErrors({
        ...form.get('confirmarSenha')?.errors,
        passwordMismatch: true,
      });

      return { passwordMismatch: true };
    }

    const errors = form.get('confirmarSenha')?.errors;

    if (errors?.['passwordMismatch']) {
      delete errors['passwordMismatch'];

      if (Object.keys(errors).length === 0) {
        form.get('confirmarSenha')?.setErrors(null);
      } else {
        form.get('confirmarSenha')?.setErrors(errors);
      }
    }

    return null;
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.CadastroForm.invalid) {
      return;
    }

    const { confirmarPassword, ...cadastroData } = this.CadastroForm.value;

    const data = {
      ...cadastroData,
      role: UserRole.BENEFICIARY,
    };

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

    this.CadastroForm.reset();
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
  }

  private slowRedirectToLoginPage(): void {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }

  isInvalid(controlName: string): boolean {
    const control = this.CadastroForm.get(controlName);

    return !!(control?.invalid && (control.touched || this.formSubmitted));
  }
}
