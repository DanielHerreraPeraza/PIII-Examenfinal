package cr.ac.ucenfotec.examen.web.rest;

import cr.ac.ucenfotec.examen.ExamenApp;
import cr.ac.ucenfotec.examen.domain.Jefatura;
import cr.ac.ucenfotec.examen.repository.JefaturaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static cr.ac.ucenfotec.examen.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link JefaturaResource} REST controller.
 */
@SpringBootTest(classes = ExamenApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class JefaturaResourceIT {

    private static final ZonedDateTime DEFAULT_FECHA_INICIO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_INICIO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private JefaturaRepository jefaturaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restJefaturaMockMvc;

    private Jefatura jefatura;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Jefatura createEntity(EntityManager em) {
        Jefatura jefatura = new Jefatura()
            .fechaInicio(DEFAULT_FECHA_INICIO);
        return jefatura;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Jefatura createUpdatedEntity(EntityManager em) {
        Jefatura jefatura = new Jefatura()
            .fechaInicio(UPDATED_FECHA_INICIO);
        return jefatura;
    }

    @BeforeEach
    public void initTest() {
        jefatura = createEntity(em);
    }

    @Test
    @Transactional
    public void createJefatura() throws Exception {
        int databaseSizeBeforeCreate = jefaturaRepository.findAll().size();
        // Create the Jefatura
        restJefaturaMockMvc.perform(post("/api/jefaturas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(jefatura)))
            .andExpect(status().isCreated());

        // Validate the Jefatura in the database
        List<Jefatura> jefaturaList = jefaturaRepository.findAll();
        assertThat(jefaturaList).hasSize(databaseSizeBeforeCreate + 1);
        Jefatura testJefatura = jefaturaList.get(jefaturaList.size() - 1);
        assertThat(testJefatura.getFechaInicio()).isEqualTo(DEFAULT_FECHA_INICIO);
    }

    @Test
    @Transactional
    public void createJefaturaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jefaturaRepository.findAll().size();

        // Create the Jefatura with an existing ID
        jefatura.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJefaturaMockMvc.perform(post("/api/jefaturas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(jefatura)))
            .andExpect(status().isBadRequest());

        // Validate the Jefatura in the database
        List<Jefatura> jefaturaList = jefaturaRepository.findAll();
        assertThat(jefaturaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkFechaInicioIsRequired() throws Exception {
        int databaseSizeBeforeTest = jefaturaRepository.findAll().size();
        // set the field null
        jefatura.setFechaInicio(null);

        // Create the Jefatura, which fails.


        restJefaturaMockMvc.perform(post("/api/jefaturas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(jefatura)))
            .andExpect(status().isBadRequest());

        List<Jefatura> jefaturaList = jefaturaRepository.findAll();
        assertThat(jefaturaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllJefaturas() throws Exception {
        // Initialize the database
        jefaturaRepository.saveAndFlush(jefatura);

        // Get all the jefaturaList
        restJefaturaMockMvc.perform(get("/api/jefaturas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jefatura.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaInicio").value(hasItem(sameInstant(DEFAULT_FECHA_INICIO))));
    }
    
    @Test
    @Transactional
    public void getJefatura() throws Exception {
        // Initialize the database
        jefaturaRepository.saveAndFlush(jefatura);

        // Get the jefatura
        restJefaturaMockMvc.perform(get("/api/jefaturas/{id}", jefatura.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(jefatura.getId().intValue()))
            .andExpect(jsonPath("$.fechaInicio").value(sameInstant(DEFAULT_FECHA_INICIO)));
    }
    @Test
    @Transactional
    public void getNonExistingJefatura() throws Exception {
        // Get the jefatura
        restJefaturaMockMvc.perform(get("/api/jefaturas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJefatura() throws Exception {
        // Initialize the database
        jefaturaRepository.saveAndFlush(jefatura);

        int databaseSizeBeforeUpdate = jefaturaRepository.findAll().size();

        // Update the jefatura
        Jefatura updatedJefatura = jefaturaRepository.findById(jefatura.getId()).get();
        // Disconnect from session so that the updates on updatedJefatura are not directly saved in db
        em.detach(updatedJefatura);
        updatedJefatura
            .fechaInicio(UPDATED_FECHA_INICIO);

        restJefaturaMockMvc.perform(put("/api/jefaturas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedJefatura)))
            .andExpect(status().isOk());

        // Validate the Jefatura in the database
        List<Jefatura> jefaturaList = jefaturaRepository.findAll();
        assertThat(jefaturaList).hasSize(databaseSizeBeforeUpdate);
        Jefatura testJefatura = jefaturaList.get(jefaturaList.size() - 1);
        assertThat(testJefatura.getFechaInicio()).isEqualTo(UPDATED_FECHA_INICIO);
    }

    @Test
    @Transactional
    public void updateNonExistingJefatura() throws Exception {
        int databaseSizeBeforeUpdate = jefaturaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restJefaturaMockMvc.perform(put("/api/jefaturas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(jefatura)))
            .andExpect(status().isBadRequest());

        // Validate the Jefatura in the database
        List<Jefatura> jefaturaList = jefaturaRepository.findAll();
        assertThat(jefaturaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteJefatura() throws Exception {
        // Initialize the database
        jefaturaRepository.saveAndFlush(jefatura);

        int databaseSizeBeforeDelete = jefaturaRepository.findAll().size();

        // Delete the jefatura
        restJefaturaMockMvc.perform(delete("/api/jefaturas/{id}", jefatura.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Jefatura> jefaturaList = jefaturaRepository.findAll();
        assertThat(jefaturaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
