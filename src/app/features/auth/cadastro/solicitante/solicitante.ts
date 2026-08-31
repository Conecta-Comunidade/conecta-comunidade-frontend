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
import { RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.html',
  imports: [ReactiveFormsModule, MessageModule, InputTextModule, PasswordModule, RouterLink],
  styles: ``,
})
export class Solicitante {
  private fb = inject(FormBuilder);

  formSubmitted = false;

  CadastroForm: FormGroup = this.fb.group(
    {
      nome: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      senha: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/)]],

      confirmarSenha: ['', Validators.required],
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

    const cadastroData = this.CadastroForm.value;

    console.log(cadastroData);

    this.CadastroForm.reset();
    this.formSubmitted = false;
  }

  isInvalid(controlName: string): boolean {
    const control = this.CadastroForm.get(controlName);

    return !!(control?.invalid && (control.touched || this.formSubmitted));
  }
}
