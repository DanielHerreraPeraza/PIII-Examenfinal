import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IJefatura } from 'app/shared/model/jefatura.model';
import { JefaturaService } from './jefatura.service';
import { JefaturaDeleteDialogComponent } from './jefatura-delete-dialog.component';

@Component({
  selector: 'jhi-jefatura',
  templateUrl: './jefatura.component.html',
})
export class JefaturaComponent implements OnInit, OnDestroy {
  jefaturas?: IJefatura[];
  eventSubscriber?: Subscription;

  constructor(protected jefaturaService: JefaturaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.jefaturaService.query().subscribe((res: HttpResponse<IJefatura[]>) => (this.jefaturas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInJefaturas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IJefatura): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInJefaturas(): void {
    this.eventSubscriber = this.eventManager.subscribe('jefaturaListModification', () => this.loadAll());
  }

  delete(jefatura: IJefatura): void {
    const modalRef = this.modalService.open(JefaturaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.jefatura = jefatura;
  }
}
