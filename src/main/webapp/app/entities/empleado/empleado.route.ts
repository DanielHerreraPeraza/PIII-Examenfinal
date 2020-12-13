import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEmpleado, Empleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from './empleado.service';
import { EmpleadoComponent } from './empleado.component';
import { EmpleadoDetailComponent } from './empleado-detail.component';
import { EmpleadoUpdateComponent } from './empleado-update.component';

@Injectable({ providedIn: 'root' })
export class EmpleadoResolve implements Resolve<IEmpleado> {
  constructor(private service: EmpleadoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmpleado> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((empleado: HttpResponse<Empleado>) => {
          if (empleado.body) {
            return of(empleado.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Empleado());
  }
}

export const empleadoRoute: Routes = [
  {
    path: '',
    component: EmpleadoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'examenApp.empleado.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmpleadoDetailComponent,
    resolve: {
      empleado: EmpleadoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'examenApp.empleado.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmpleadoUpdateComponent,
    resolve: {
      empleado: EmpleadoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'examenApp.empleado.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmpleadoUpdateComponent,
    resolve: {
      empleado: EmpleadoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'examenApp.empleado.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
