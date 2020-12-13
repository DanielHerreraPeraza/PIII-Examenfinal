import { IEmpleado } from 'app/shared/model/empleado.model';
import { IJefatura } from 'app/shared/model/jefatura.model';
import { Estado } from 'app/shared/model/enumerations/estado.model';

export interface IDepartamento {
  id?: number;
  nombre?: string;
  descripcion?: string;
  estado?: Estado;
  empleados?: IEmpleado[];
  jefatura?: IJefatura;
}

export class Departamento implements IDepartamento {
  constructor(
    public id?: number,
    public nombre?: string,
    public descripcion?: string,
    public estado?: Estado,
    public empleados?: IEmpleado[],
    public jefatura?: IJefatura
  ) {}
}
