package edu.tum.ase.darkmode.service;

import java.util.concurrent.TimeUnit;
import java.io.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.tum.ase.darkmode.service.SseService;

@Service
public class DarkmodeService {

	@Autowired
    private SseService sseService;

    private boolean isDarkModeEnabled = false;
	private long lastToggleTime = 0;
	private static final long COOLDOWN_TIME = TimeUnit.SECONDS.toMillis(3);

    public void toggleDarkMode() {
		
        long currentTime = System.currentTimeMillis();

		// Check if the cool-down time has passed
		if (currentTime - lastToggleTime > COOLDOWN_TIME) {
			// Toggle the dark mode status
			isDarkModeEnabled = !isDarkModeEnabled;
			
			sseService.sendThemeChangeEvent();
			
			System.out.println("Dark mode toggled. Current status: " + (isDarkModeEnabled ? "enabled" : "disabled"));

			// Update the last toggle time
			lastToggleTime = currentTime;
		} else {
			System.out.println("Cooldown period. Dark mode not toggled.");
		}
	}

	public boolean getDarkModeStatus(){
		return isDarkModeEnabled;
	}
    
}
