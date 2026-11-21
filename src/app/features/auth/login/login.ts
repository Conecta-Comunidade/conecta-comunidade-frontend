import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Router, RouterLink } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { AuthService } from '../services/auth';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MessageModule,
    ToastModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    RouterLink,
    Button,
  ],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  formSubmitted = false;

  LoginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/)]],
  });

  onSubmit() {
    this.formSubmitted = true;

    if (this.LoginForm.invalid) {
      return;
    }

    this.authService.login(this.LoginForm.value).subscribe({
      next: (data: { token: string }) => this.handleRegisterSuccess(data),
      error: (err) => this.handleRegisterError(err),
    });
  }

  private handleRegisterSuccess(data: { token: string }) {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Login realizado com sucesso!',
    });

    this.LoginForm.reset();
    this.formSubmitted = false;

    sessionStorage.setItem('conecta-token', JSON.stringify(data.token));

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000);
  }

  private handleRegisterError(error: HttpErrorResponse): void {
    const response = error.error as ErrorDTOResponse;

    const fieldErrors = response.fieldErrors?.map((field) => field.message).join('\n');

    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: [response.message, fieldErrors].filter(Boolean).join('\n'),
    });
    this.formSubmitted = false;
  }

  isInvalid(controlName: string): boolean {
    const control = this.LoginForm.get(controlName);

    return !!(control?.invalid && (control.touched || this.formSubmitted));
  }
}
