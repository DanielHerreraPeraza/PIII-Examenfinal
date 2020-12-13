package cr.ac.ucenfotec.examen.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import cr.ac.ucenfotec.examen.web.rest.TestUtil;

public class JefaturaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Jefatura.class);
        Jefatura jefatura1 = new Jefatura();
        jefatura1.setId(1L);
        Jefatura jefatura2 = new Jefatura();
        jefatura2.setId(jefatura1.getId());
        assertThat(jefatura1).isEqualTo(jefatura2);
        jefatura2.setId(2L);
        assertThat(jefatura1).isNotEqualTo(jefatura2);
        jefatura1.setId(null);
        assertThat(jefatura1).isNotEqualTo(jefatura2);
    }
}
