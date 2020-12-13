package cr.ac.ucenfotec.examen.repository;

import cr.ac.ucenfotec.examen.domain.Jefatura;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Jefatura entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JefaturaRepository extends JpaRepository<Jefatura, Long> {
}
