import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IJefatura } from 'app/shared/model/jefatura.model';

type EntityResponseType = HttpResponse<IJefatura>;
type EntityArrayResponseType = HttpResponse<IJefatura[]>;

@Injectable({ providedIn: 'root' })
export class JefaturaService {
  public resourceUrl = SERVER_API_URL + 'api/jefaturas';

  constructor(protected http: HttpClient) {}

  create(jefatura: IJefatura): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(jefatura);
    return this.http
      .post<IJefatura>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(jefatura: IJefatura): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(jefatura);
    return this.http
      .put<IJefatura>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IJefatura>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IJefatura[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(jefatura: IJefatura): IJefatura {
    const copy: IJefatura = Object.assign({}, jefatura, {
      fechaInicio: jefatura.fechaInicio && jefatura.fechaInicio.isValid() ? jefatura.fechaInicio.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaInicio = res.body.fechaInicio ? moment(res.body.fechaInicio) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((jefatura: IJefatura) => {
        jefatura.fechaInicio = jefatura.fechaInicio ? moment(jefatura.fechaInicio) : undefined;
      });
    }
    return res;
  }
}
