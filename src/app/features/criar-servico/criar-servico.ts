import { Component, computed, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { format } from 'date-fns';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { Button } from '../../shared/components/button/button';
import { Area } from '../model/area';
import { toSignal } from '@angular/core/rxjs-interop';
import { optionsStylesArea } from '../../shared/utils/optionsStylesArea';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { CommunityServices } from '../../data/community-services/community-services';

@Component({
  selector: 'app-criar-servico',
  standalone: true,
  imports: [ReactiveFormsModule, Button, SelectModule, DatePickerModule, Toast],
  templateUrl: './criar-servico.html',
  styleUrl: './criar-servico.css',
})
export class CriarServico implements OnInit {
  private location = inject(Location);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);
  private communityService = inject(CommunityServices);
  tomorrowDate = new Date(new Date().setDate(new Date().getDate() + 1));

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
    name: ['', [Validators.required, Validators.minLength(10)]],
    area: [Area.EDUCATION, [Validators.required]],
    date: [this.tomorrowDate, [Validators.required]],
    horarioInicio: [this.tomorrowDate, [Validators.required]],
    local: ['', [Validators.required, Validators.minLength(10)]],
    vagas: [1, [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
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
      style: {
        bg: form.area ? optionsStylesArea(form.area).bg : 'bg-gray-500',
        textColor: form.area ? optionsStylesArea(form.area)['text-color'] : 'text-gray-500',
        icon: form.area ? optionsStylesArea(form.area).icon : 'pi-question-circle',
      },
    };
  });

  onSubmit() {
    this.formSubmitted = true;
    this.createServiceForm.markAllAsTouched();

    if (this.createServiceForm.invalid) {
      console.log('Formulário inválido:', this.createServiceForm.errors);
      return;
    }

    const transformedDate = {
      ...this.createServiceForm.value,
      date: format(this.createServiceForm.value.date, 'yyyy-MM-dd'),
      horarioInicio: format(this.createServiceForm.value.horarioInicio, 'HH:mm'),
    };

    this.communityService.create(transformedDate).subscribe({
      next: () => this.handleRegisterSuccess(),
      error: (error: HttpErrorResponse) => this.handleRegisterError(error),
    });
  }

  private handleRegisterSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Serviço criado com sucesso!',
    });

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Acesse "Meus Serviços" para visualizar e gerenciar seus serviços.',
    });
    this.formSubmitted = false;
    this.createServiceForm.reset();
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
    const control = this.createServiceForm.get(controlName);

    return !!(control?.invalid && (control.touched || this.formSubmitted));
  }

  public back() {
    this.location.back();
  }
}
