import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ExamenTestModule } from '../../../test.module';
import { JefaturaDetailComponent } from 'app/entities/jefatura/jefatura-detail.component';
import { Jefatura } from 'app/shared/model/jefatura.model';

describe('Component Tests', () => {
  describe('Jefatura Management Detail Component', () => {
    let comp: JefaturaDetailComponent;
    let fixture: ComponentFixture<JefaturaDetailComponent>;
    const route = ({ data: of({ jefatura: new Jefatura(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExamenTestModule],
        declarations: [JefaturaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(JefaturaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(JefaturaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load jefatura on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.jefatura).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
