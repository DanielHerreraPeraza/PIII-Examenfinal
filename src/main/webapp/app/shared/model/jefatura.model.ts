import { Moment } from 'moment';
import { IDepartamento } from 'app/shared/model/departamento.model';
import { IEmpleado } from 'app/shared/model/empleado.model';

export interface IJefatura {
  id?: number;
  fechaInicio?: Moment;
  departamento?: IDepartamento;
  empleado?: IEmpleado;
}

export class Jefatura implements IJefatura {
  constructor(public id?: number, public fechaInicio?: Moment, public departamento?: IDepartamento, public empleado?: IEmpleado) {}
}
