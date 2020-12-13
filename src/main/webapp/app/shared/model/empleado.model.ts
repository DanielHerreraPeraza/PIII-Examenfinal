import { Moment } from 'moment';
import { IJefatura } from 'app/shared/model/jefatura.model';
import { IDepartamento } from 'app/shared/model/departamento.model';
import { PuestoEmpleado } from 'app/shared/model/enumerations/puesto-empleado.model';
import { Estado } from 'app/shared/model/enumerations/estado.model';

export interface IEmpleado {
  id?: number;
  nombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  sexo?: string;
  fechaNacimiento?: Moment;
  fechaIngreso?: Moment;
  puesto?: PuestoEmpleado;
  salario?: number;
  estado?: Estado;
  empleado?: IJefatura;
  departamento?: IDepartamento;
}

export class Empleado implements IEmpleado {
  constructor(
    public id?: number,
    public nombre?: string,
    public primerApellido?: string,
    public segundoApellido?: string,
    public sexo?: string,
    public fechaNacimiento?: Moment,
    public fechaIngreso?: Moment,
    public puesto?: PuestoEmpleado,
    public salario?: number,
    public estado?: Estado,
    public empleado?: IJefatura,
    public departamento?: IDepartamento
  ) {}
}
