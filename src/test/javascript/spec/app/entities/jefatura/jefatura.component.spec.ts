import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ExamenTestModule } from '../../../test.module';
import { JefaturaComponent } from 'app/entities/jefatura/jefatura.component';
import { JefaturaService } from 'app/entities/jefatura/jefatura.service';
import { Jefatura } from 'app/shared/model/jefatura.model';

describe('Component Tests', () => {
  describe('Jefatura Management Component', () => {
    let comp: JefaturaComponent;
    let fixture: ComponentFixture<JefaturaComponent>;
    let service: JefaturaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExamenTestModule],
        declarations: [JefaturaComponent],
      })
        .overrideTemplate(JefaturaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(JefaturaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(JefaturaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Jefatura(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.jefaturas && comp.jefaturas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
