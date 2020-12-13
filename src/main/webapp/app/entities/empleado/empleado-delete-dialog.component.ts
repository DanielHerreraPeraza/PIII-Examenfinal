import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from './empleado.service';

@Component({
  templateUrl: './empleado-delete-dialog.component.html',
})
export class EmpleadoDeleteDialogComponent {
  empleado?: IEmpleado;

  constructor(protected empleadoService: EmpleadoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.empleadoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('empleadoListModification');
      this.activeModal.close();
    });
  }
}
