import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectModule } from 'primeng/select';
import { Button } from '../../../../shared/components/button/button';

@Component({
  selector: 'app-prestador',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MessageModule,
    InputTextModule,
    PasswordModule,
    RouterLink,
    SelectModule,
    InputMaskModule,
    Button,
  ],
  templateUrl: './prestador.html',
  styles: ``,
})
export class Prestador {
  areas = [
    { label: 'Educação', value: 'EDUCACAO' },
    { label: 'Saúde', value: 'SAUDE' },
    { label: 'Assistência Social', value: 'ASSISTENCIA_SOCIAL' },
    { label: 'Esporte e Lazer', value: 'ESPORTE_LAZER' },
    { label: 'Cultura', value: 'CULTURA' },
    { label: 'Meio Ambiente', value: 'MEIO_AMBIENTE' },
    { label: 'Serviços Administrativos', value: 'SERVICOS_ADMINISTRATIVOS' },
    { label: 'Tecnologia', value: 'TECNOLOGIA' },
    { label: 'Outros', value: 'OUTROS' },
  ];
  private fb = inject(FormBuilder);

  formSubmitted = false;

  CadastroForm: FormGroup = this.fb.group(
    {
      nome: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],
      contato: ['', [Validators.required]],

      area: ['', [Validators.required]],

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
