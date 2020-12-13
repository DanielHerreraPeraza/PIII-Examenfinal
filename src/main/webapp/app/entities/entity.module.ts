import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'empleado',
        loadChildren: () => import('./empleado/empleado.module').then(m => m.ExamenEmpleadoModule),
      },
      {
        path: 'departamento',
        loadChildren: () => import('./departamento/departamento.module').then(m => m.ExamenDepartamentoModule),
      },
      {
        path: 'jefatura',
        loadChildren: () => import('./jefatura/jefatura.module').then(m => m.ExamenJefaturaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class ExamenEntityModule {}
