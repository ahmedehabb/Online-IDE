package edu.tum.ase.darkmode;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class DarkmodeApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getDarkModeStatusTest() throws Exception {
        // Perform a GET request to the /dark-mode endpoint
        mockMvc.perform(MockMvcRequestBuilders.get("api/dark-mode"))
                // Expect the status to be 200 OK
                .andExpect(status().isOk())
                // Expect the content to be "false" since dark mode is disabled by default
                .andExpect(content().string("false"));
    }
}