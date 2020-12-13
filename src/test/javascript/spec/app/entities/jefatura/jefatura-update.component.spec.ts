import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ExamenTestModule } from '../../../test.module';
import { JefaturaUpdateComponent } from 'app/entities/jefatura/jefatura-update.component';
import { JefaturaService } from 'app/entities/jefatura/jefatura.service';
import { Jefatura } from 'app/shared/model/jefatura.model';

describe('Component Tests', () => {
  describe('Jefatura Management Update Component', () => {
    let comp: JefaturaUpdateComponent;
    let fixture: ComponentFixture<JefaturaUpdateComponent>;
    let service: JefaturaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ExamenTestModule],
        declarations: [JefaturaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(JefaturaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(JefaturaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(JefaturaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Jefatura(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Jefatura();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
