import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IJefatura, Jefatura } from 'app/shared/model/jefatura.model';
import { JefaturaService } from './jefatura.service';
import { IDepartamento } from 'app/shared/model/departamento.model';
import { DepartamentoService } from 'app/entities/departamento/departamento.service';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado/empleado.service';

type SelectableEntity = IDepartamento | IEmpleado;

@Component({
  selector: 'jhi-jefatura-update',
  templateUrl: './jefatura-update.component.html',
})
export class JefaturaUpdateComponent implements OnInit {
  isSaving = false;
  departamentos: IDepartamento[] = [];
  empleados: IEmpleado[] = [];

  editForm = this.fb.group({
    id: [],
    fechaInicio: [null, [Validators.required]],
    departamento: [],
    empleado: [],
  });

  constructor(
    protected jefaturaService: JefaturaService,
    protected departamentoService: DepartamentoService,
    protected empleadoService: EmpleadoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jefatura }) => {
      if (!jefatura.id) {
        const today = moment().startOf('day');
        jefatura.fechaInicio = today;
      }

      this.updateForm(jefatura);

      this.departamentoService
        .query({ filter: 'jefatura-is-null' })
        .pipe(
          map((res: HttpResponse<IDepartamento[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IDepartamento[]) => {
          if (!jefatura.departamento || !jefatura.departamento.id) {
            this.departamentos = resBody;
          } else {
            this.departamentoService
              .find(jefatura.departamento.id)
              .pipe(
                map((subRes: HttpResponse<IDepartamento>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IDepartamento[]) => (this.departamentos = concatRes));
          }
        });

      this.empleadoService
        .query({ filter: 'empleado-is-null' })
        .pipe(
          map((res: HttpResponse<IEmpleado[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEmpleado[]) => {
          if (!jefatura.empleado || !jefatura.empleado.id) {
            this.empleados = resBody;
          } else {
            this.empleadoService
              .find(jefatura.empleado.id)
              .pipe(
                map((subRes: HttpResponse<IEmpleado>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEmpleado[]) => (this.empleados = concatRes));
          }
        });
    });
  }

  updateForm(jefatura: IJefatura): void {
    this.editForm.patchValue({
      id: jefatura.id,
      fechaInicio: jefatura.fechaInicio ? jefatura.fechaInicio.format(DATE_TIME_FORMAT) : null,
      departamento: jefatura.departamento,
      empleado: jefatura.empleado,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const jefatura = this.createFromForm();
    if (jefatura.id !== undefined) {
      this.subscribeToSaveResponse(this.jefaturaService.update(jefatura));
    } else {
      this.subscribeToSaveResponse(this.jefaturaService.create(jefatura));
    }
  }

  private createFromForm(): IJefatura {
    return {
      ...new Jefatura(),
      id: this.editForm.get(['id'])!.value,
      fechaInicio: this.editForm.get(['fechaInicio'])!.value
        ? moment(this.editForm.get(['fechaInicio'])!.value, DATE_TIME_FORMAT)
        : undefined,
      departamento: this.editForm.get(['departamento'])!.value,
      empleado: this.editForm.get(['empleado'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IJefatura>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
