import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { EmpleadoService } from 'app/entities/empleado/empleado.service';
import { IEmpleado, Empleado } from 'app/shared/model/empleado.model';
import { PuestoEmpleado } from 'app/shared/model/enumerations/puesto-empleado.model';
import { Estado } from 'app/shared/model/enumerations/estado.model';

describe('Service Tests', () => {
  describe('Empleado Service', () => {
    let injector: TestBed;
    let service: EmpleadoService;
    let httpMock: HttpTestingController;
    let elemDefault: IEmpleado;
    let expectedResult: IEmpleado | IEmpleado[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EmpleadoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Empleado(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
        PuestoEmpleado.PROGRAMADOR,
        0,
        Estado.ACTIVO
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaNacimiento: currentDate.format(DATE_TIME_FORMAT),
            fechaIngreso: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Empleado', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaNacimiento: currentDate.format(DATE_TIME_FORMAT),
            fechaIngreso: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaNacimiento: currentDate,
            fechaIngreso: currentDate,
          },
          returnedFromService
        );

        service.create(new Empleado()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Empleado', () => {
        const returnedFromService = Object.assign(
          {
            nombre: 'BBBBBB',
            primerApellido: 'BBBBBB',
            segundoApellido: 'BBBBBB',
            sexo: 'BBBBBB',
            fechaNacimiento: currentDate.format(DATE_TIME_FORMAT),
            fechaIngreso: currentDate.format(DATE_TIME_FORMAT),
            puesto: 'BBBBBB',
            salario: 1,
            estado: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaNacimiento: currentDate,
            fechaIngreso: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Empleado', () => {
        const returnedFromService = Object.assign(
          {
            nombre: 'BBBBBB',
            primerApellido: 'BBBBBB',
            segundoApellido: 'BBBBBB',
            sexo: 'BBBBBB',
            fechaNacimiento: currentDate.format(DATE_TIME_FORMAT),
            fechaIngreso: currentDate.format(DATE_TIME_FORMAT),
            puesto: 'BBBBBB',
            salario: 1,
            estado: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaNacimiento: currentDate,
            fechaIngreso: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Empleado', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
