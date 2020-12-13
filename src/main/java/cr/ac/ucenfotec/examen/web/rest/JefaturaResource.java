package cr.ac.ucenfotec.examen.web.rest;

import cr.ac.ucenfotec.examen.domain.Jefatura;
import cr.ac.ucenfotec.examen.repository.JefaturaRepository;
import cr.ac.ucenfotec.examen.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link cr.ac.ucenfotec.examen.domain.Jefatura}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class JefaturaResource {

    private final Logger log = LoggerFactory.getLogger(JefaturaResource.class);

    private static final String ENTITY_NAME = "jefatura";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final JefaturaRepository jefaturaRepository;

    public JefaturaResource(JefaturaRepository jefaturaRepository) {
        this.jefaturaRepository = jefaturaRepository;
    }

    /**
     * {@code POST  /jefaturas} : Create a new jefatura.
     *
     * @param jefatura the jefatura to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new jefatura, or with status {@code 400 (Bad Request)} if the jefatura has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/jefaturas")
    public ResponseEntity<Jefatura> createJefatura(@Valid @RequestBody Jefatura jefatura) throws URISyntaxException {
        log.debug("REST request to save Jefatura : {}", jefatura);
        if (jefatura.getId() != null) {
            throw new BadRequestAlertException("A new jefatura cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Jefatura result = jefaturaRepository.save(jefatura);
        return ResponseEntity.created(new URI("/api/jefaturas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /jefaturas} : Updates an existing jefatura.
     *
     * @param jefatura the jefatura to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated jefatura,
     * or with status {@code 400 (Bad Request)} if the jefatura is not valid,
     * or with status {@code 500 (Internal Server Error)} if the jefatura couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/jefaturas")
    public ResponseEntity<Jefatura> updateJefatura(@Valid @RequestBody Jefatura jefatura) throws URISyntaxException {
        log.debug("REST request to update Jefatura : {}", jefatura);
        if (jefatura.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Jefatura result = jefaturaRepository.save(jefatura);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, jefatura.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /jefaturas} : get all the jefaturas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of jefaturas in body.
     */
    @GetMapping("/jefaturas")
    public List<Jefatura> getAllJefaturas() {
        log.debug("REST request to get all Jefaturas");
        return jefaturaRepository.findAll();
    }

    /**
     * {@code GET  /jefaturas/:id} : get the "id" jefatura.
     *
     * @param id the id of the jefatura to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the jefatura, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/jefaturas/{id}")
    public ResponseEntity<Jefatura> getJefatura(@PathVariable Long id) {
        log.debug("REST request to get Jefatura : {}", id);
        Optional<Jefatura> jefatura = jefaturaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(jefatura);
    }

    /**
     * {@code DELETE  /jefaturas/:id} : delete the "id" jefatura.
     *
     * @param id the id of the jefatura to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/jefaturas/{id}")
    public ResponseEntity<Void> deleteJefatura(@PathVariable Long id) {
        log.debug("REST request to delete Jefatura : {}", id);
        jefaturaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
