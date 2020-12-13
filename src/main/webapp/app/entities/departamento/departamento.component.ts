import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDepartamento } from 'app/shared/model/departamento.model';
import { DepartamentoService } from './departamento.service';
import { DepartamentoDeleteDialogComponent } from './departamento-delete-dialog.component';

@Component({
  selector: 'jhi-departamento',
  templateUrl: './departamento.component.html',
})
export class DepartamentoComponent implements OnInit, OnDestroy {
  departamentos?: IDepartamento[];
  eventSubscriber?: Subscription;

  constructor(
    protected departamentoService: DepartamentoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.departamentoService.query().subscribe((res: HttpResponse<IDepartamento[]>) => (this.departamentos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDepartamentos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDepartamento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDepartamentos(): void {
    this.eventSubscriber = this.eventManager.subscribe('departamentoListModification', () => this.loadAll());
  }

  delete(departamento: IDepartamento): void {
    const modalRef = this.modalService.open(DepartamentoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.departamento = departamento;
  }
}
