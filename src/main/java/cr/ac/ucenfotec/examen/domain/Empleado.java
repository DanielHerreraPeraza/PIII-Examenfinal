package cr.ac.ucenfotec.examen.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

import cr.ac.ucenfotec.examen.domain.enumeration.PuestoEmpleado;

import cr.ac.ucenfotec.examen.domain.enumeration.Estado;

/**
 * A Empleado.
 */
@Entity
@Table(name = "empleado")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Empleado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotNull
    @Column(name = "primer_apellido", nullable = false)
    private String primerApellido;

    @NotNull
    @Column(name = "segundo_apellido", nullable = false)
    private String segundoApellido;

    @NotNull
    @Column(name = "sexo", nullable = false)
    private String sexo;

    @NotNull
    @Column(name = "fecha_nacimiento", nullable = false)
    private ZonedDateTime fechaNacimiento;

    @NotNull
    @Column(name = "fecha_ingreso", nullable = false)
    private ZonedDateTime fechaIngreso;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "puesto", nullable = false)
    private PuestoEmpleado puesto;

    @NotNull
    @DecimalMin(value = "1")
    @Column(name = "salario", nullable = false)
    private Double salario;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private Estado estado;

    @OneToOne(mappedBy = "empleado")
    @JsonIgnore
    private Jefatura empleado;

    @ManyToOne
    @JsonIgnoreProperties(value = "empleados", allowSetters = true)
    private Departamento departamento;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Empleado nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPrimerApellido() {
        return primerApellido;
    }

    public Empleado primerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
        return this;
    }

    public void setPrimerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
    }

    public String getSegundoApellido() {
        return segundoApellido;
    }

    public Empleado segundoApellido(String segundoApellido) {
        this.segundoApellido = segundoApellido;
        return this;
    }

    public void setSegundoApellido(String segundoApellido) {
        this.segundoApellido = segundoApellido;
    }

    public String getSexo() {
        return sexo;
    }

    public Empleado sexo(String sexo) {
        this.sexo = sexo;
        return this;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public ZonedDateTime getFechaNacimiento() {
        return fechaNacimiento;
    }

    public Empleado fechaNacimiento(ZonedDateTime fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
        return this;
    }

    public void setFechaNacimiento(ZonedDateTime fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public ZonedDateTime getFechaIngreso() {
        return fechaIngreso;
    }

    public Empleado fechaIngreso(ZonedDateTime fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
        return this;
    }

    public void setFechaIngreso(ZonedDateTime fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public PuestoEmpleado getPuesto() {
        return puesto;
    }

    public Empleado puesto(PuestoEmpleado puesto) {
        this.puesto = puesto;
        return this;
    }

    public void setPuesto(PuestoEmpleado puesto) {
        this.puesto = puesto;
    }

    public Double getSalario() {
        return salario;
    }

    public Empleado salario(Double salario) {
        this.salario = salario;
        return this;
    }

    public void setSalario(Double salario) {
        this.salario = salario;
    }

    public Estado getEstado() {
        return estado;
    }

    public Empleado estado(Estado estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public Jefatura getEmpleado() {
        return empleado;
    }

    public Empleado empleado(Jefatura jefatura) {
        this.empleado = jefatura;
        return this;
    }

    public void setEmpleado(Jefatura jefatura) {
        this.empleado = jefatura;
    }

    public Departamento getDepartamento() {
        return departamento;
    }

    public Empleado departamento(Departamento departamento) {
        this.departamento = departamento;
        return this;
    }

    public void setDepartamento(Departamento departamento) {
        this.departamento = departamento;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Empleado)) {
            return false;
        }
        return id != null && id.equals(((Empleado) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Empleado{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", primerApellido='" + getPrimerApellido() + "'" +
            ", segundoApellido='" + getSegundoApellido() + "'" +
            ", sexo='" + getSexo() + "'" +
            ", fechaNacimiento='" + getFechaNacimiento() + "'" +
            ", fechaIngreso='" + getFechaIngreso() + "'" +
            ", puesto='" + getPuesto() + "'" +
            ", salario=" + getSalario() +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
