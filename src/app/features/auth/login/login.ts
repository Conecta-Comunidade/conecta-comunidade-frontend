import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RouterLink } from '@angular/router';
import { Button } from '../../../shared/components/button/button';

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

  formSubmitted = false;

  LoginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/)]],
  });

  onSubmit() {
    this.formSubmitted = true;

    if (this.LoginForm.invalid) {
      return;
    }

    console.log(this.LoginForm.value);
    this.LoginForm.reset();
    this.formSubmitted = false;
  }

  isInvalid(controlName: string): boolean {
    const control = this.LoginForm.get(controlName);

    return !!(control?.invalid && (control.touched || this.formSubmitted));
  }
}
