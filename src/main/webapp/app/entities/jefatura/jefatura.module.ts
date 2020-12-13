import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ExamenSharedModule } from 'app/shared/shared.module';
import { JefaturaComponent } from './jefatura.component';
import { JefaturaDetailComponent } from './jefatura-detail.component';
import { JefaturaUpdateComponent } from './jefatura-update.component';
import { JefaturaDeleteDialogComponent } from './jefatura-delete-dialog.component';
import { jefaturaRoute } from './jefatura.route';

@NgModule({
  imports: [ExamenSharedModule, RouterModule.forChild(jefaturaRoute)],
  declarations: [JefaturaComponent, JefaturaDetailComponent, JefaturaUpdateComponent, JefaturaDeleteDialogComponent],
  entryComponents: [JefaturaDeleteDialogComponent],
})
export class ExamenJefaturaModule {}
