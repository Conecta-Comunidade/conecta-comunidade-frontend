import { Component, computed, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { format } from 'date-fns';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { Button } from '../../shared/components/button/button';
import { Area } from '../model/area';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-criar-servico',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, Button, SelectModule, DatePickerModule],
  templateUrl: './criar-servico.html',
  styleUrl: './criar-servico.css',
})
export class CriarServico implements OnInit {
  private location = inject(Location);
  private fb = inject(FormBuilder);
  currentDate = new Date();
  formSubmitted = false;
  areas: { id: Area; name: string }[] = [];

  ngOnInit(): void {
    this.createServiceForm.get('date')?.valueChanges.subscribe(() => {
      this.createServiceForm.get('horarioInicio')?.updateValueAndValidity();
    });

    this.areas = [
      { id: Area.EDUCATION, name: 'Educação' },
      { id: Area.HEALTH, name: 'Saúde' },
      { id: Area.BEAUTY, name: 'Beleza' },
      { id: Area.LEISURE, name: 'Lazer' },
      { id: Area.SPORTS, name: 'Esporte' },
      { id: Area.OTHER, name: 'Outro' },
    ];
  }

  createServiceForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(1)]],
    area: [Area.EDUCATION, [Validators.required]],
    date: [format(this.currentDate, 'yyyy-MM-dd'), [Validators.required]],
    horarioInicio: [format(this.currentDate, 'HH:mm'), [Validators.required]],
    local: ['', [Validators.required, Validators.minLength(1)]],
    vagas: [1, [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required, Validators.minLength(1)]],
  });

  private formValue = toSignal(this.createServiceForm.valueChanges, {
    initialValue: this.createServiceForm.getRawValue(),
  });

  preview = computed(() => {
    const form = this.formValue();

    const date = form.date
      ? format(
          form.date instanceof Date ? form.date : new Date(`${form.date}T00:00:00`),
          'dd/MM/yyyy',
        )
      : 'Data não informada';

    const startTime = form.horarioInicio
      ? form.horarioInicio instanceof Date
        ? form.horarioInicio
        : new Date(`2000-01-01T${form.horarioInicio}`)
      : null;

    const vagas = Number(form.vagas) || 0;

    const horarios = startTime
      ? Array.from({ length: Math.max(0, vagas) }, (_, index) => {
          const horario = new Date(startTime);

          horario.setMinutes(horario.getMinutes() + index * 30);

          return format(horario, 'HH:mm');
        })
      : [];

    return {
      name: form.name || 'Nome do serviço',
      area: this.areas.find((area) => area.id === form.area)?.name || 'Área não selecionada',
      date,
      horarioInicio: startTime ? format(startTime, 'HH:mm') : 'Horário não informado',
      horarios,
      local: form.local || 'Local não informado',
      vagas,
      description: form.description || 'A descrição do serviço aparecerá aqui.',
    };
  });

  onSubmit() {
    this.formSubmitted = true;

    this.createServiceForm.markAllAsTouched();

    if (this.createServiceForm.invalid) {
      console.log('Formulário inválido:', this.createServiceForm.errors);
      return;
    }

    const service = this.createServiceForm.value;

    console.log('Serviço criado:', service);
  }

  isInvalid(controlName: string): boolean {
    const control = this.createServiceForm.get(controlName);

    return !!(control?.invalid && (control.touched || this.formSubmitted));
  }

  public back() {
    this.location.back();
  }
}
