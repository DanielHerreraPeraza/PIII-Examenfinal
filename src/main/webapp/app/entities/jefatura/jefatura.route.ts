import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IJefatura, Jefatura } from 'app/shared/model/jefatura.model';
import { JefaturaService } from './jefatura.service';
import { JefaturaComponent } from './jefatura.component';
import { JefaturaDetailComponent } from './jefatura-detail.component';
import { JefaturaUpdateComponent } from './jefatura-update.component';

@Injectable({ providedIn: 'root' })
export class JefaturaResolve implements Resolve<IJefatura> {
  constructor(private service: JefaturaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IJefatura> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((jefatura: HttpResponse<Jefatura>) => {
          if (jefatura.body) {
            return of(jefatura.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Jefatura());
  }
}

export const jefaturaRoute: Routes = [
  {
    path: '',
    component: JefaturaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'examenApp.jefatura.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: JefaturaDetailComponent,
    resolve: {
      jefatura: JefaturaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'examenApp.jefatura.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: JefaturaUpdateComponent,
    resolve: {
      jefatura: JefaturaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'examenApp.jefatura.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: JefaturaUpdateComponent,
    resolve: {
      jefatura: JefaturaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'examenApp.jefatura.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
