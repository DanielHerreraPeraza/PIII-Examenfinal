import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IJefatura } from 'app/shared/model/jefatura.model';

@Component({
  selector: 'jhi-jefatura-detail',
  templateUrl: './jefatura-detail.component.html',
})
export class JefaturaDetailComponent implements OnInit {
  jefatura: IJefatura | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ jefatura }) => (this.jefatura = jefatura));
  }

  previousState(): void {
    window.history.back();
  }
}
