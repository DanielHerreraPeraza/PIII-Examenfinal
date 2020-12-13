import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IJefatura } from 'app/shared/model/jefatura.model';
import { JefaturaService } from './jefatura.service';

@Component({
  templateUrl: './jefatura-delete-dialog.component.html',
})
export class JefaturaDeleteDialogComponent {
  jefatura?: IJefatura;

  constructor(protected jefaturaService: JefaturaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.jefaturaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('jefaturaListModification');
      this.activeModal.close();
    });
  }
}
