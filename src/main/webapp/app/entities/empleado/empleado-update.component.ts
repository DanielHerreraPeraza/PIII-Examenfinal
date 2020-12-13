import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IEmpleado, Empleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from './empleado.service';
import { IDepartamento } from 'app/shared/model/departamento.model';
import { DepartamentoService } from 'app/entities/departamento/departamento.service';

@Component({
  selector: 'jhi-empleado-update',
  templateUrl: './empleado-update.component.html',
})
export class EmpleadoUpdateComponent implements OnInit {
  isSaving = false;
  departamentos: IDepartamento[] = [];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    primerApellido: [null, [Validators.required]],
    segundoApellido: [null, [Validators.required]],
    sexo: [null, [Validators.required]],
    fechaNacimiento: [null, [Validators.required]],
    fechaIngreso: [null, [Validators.required]],
    puesto: [null, [Validators.required]],
    salario: [null, [Validators.required, Validators.min(1)]],
    estado: [null, [Validators.required]],
    departamento: [],
  });

  constructor(
    protected empleadoService: EmpleadoService,
    protected departamentoService: DepartamentoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ empleado }) => {
      if (!empleado.id) {
        const today = moment().startOf('day');
        empleado.fechaNacimiento = today;
        empleado.fechaIngreso = today;
      }

      this.updateForm(empleado);

      this.departamentoService.query().subscribe((res: HttpResponse<IDepartamento[]>) => (this.departamentos = res.body || []));
    });
  }

  updateForm(empleado: IEmpleado): void {
    this.editForm.patchValue({
      id: empleado.id,
      nombre: empleado.nombre,
      primerApellido: empleado.primerApellido,
      segundoApellido: empleado.segundoApellido,
      sexo: empleado.sexo,
      fechaNacimiento: empleado.fechaNacimiento ? empleado.fechaNacimiento.format(DATE_TIME_FORMAT) : null,
      fechaIngreso: empleado.fechaIngreso ? empleado.fechaIngreso.format(DATE_TIME_FORMAT) : null,
      puesto: empleado.puesto,
      salario: empleado.salario,
      estado: empleado.estado,
      departamento: empleado.departamento,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const empleado = this.createFromForm();
    if (empleado.id !== undefined) {
      this.subscribeToSaveResponse(this.empleadoService.update(empleado));
    } else {
      this.subscribeToSaveResponse(this.empleadoService.create(empleado));
    }
  }

  private createFromForm(): IEmpleado {
    return {
      ...new Empleado(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      primerApellido: this.editForm.get(['primerApellido'])!.value,
      segundoApellido: this.editForm.get(['segundoApellido'])!.value,
      sexo: this.editForm.get(['sexo'])!.value,
      fechaNacimiento: this.editForm.get(['fechaNacimiento'])!.value
        ? moment(this.editForm.get(['fechaNacimiento'])!.value, DATE_TIME_FORMAT)
        : undefined,
      fechaIngreso: this.editForm.get(['fechaIngreso'])!.value
        ? moment(this.editForm.get(['fechaIngreso'])!.value, DATE_TIME_FORMAT)
        : undefined,
      puesto: this.editForm.get(['puesto'])!.value,
      salario: this.editForm.get(['salario'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      departamento: this.editForm.get(['departamento'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmpleado>>): void {
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

  trackById(index: number, item: IDepartamento): any {
    return item.id;
  }
}
