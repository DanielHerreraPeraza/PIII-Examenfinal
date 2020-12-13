import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from './empleado.service';
import { EmpleadoDeleteDialogComponent } from './empleado-delete-dialog.component';

@Component({
  selector: 'jhi-empleado',
  templateUrl: './empleado.component.html',
})
export class EmpleadoComponent implements OnInit, OnDestroy {
  empleados?: IEmpleado[];
  eventSubscriber?: Subscription;

  constructor(protected empleadoService: EmpleadoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.empleadoService.query().subscribe((res: HttpResponse<IEmpleado[]>) => (this.empleados = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEmpleados();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEmpleado): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEmpleados(): void {
    this.eventSubscriber = this.eventManager.subscribe('empleadoListModification', () => this.loadAll());
  }

  delete(empleado: IEmpleado): void {
    const modalRef = this.modalService.open(EmpleadoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.empleado = empleado;
  }
}
