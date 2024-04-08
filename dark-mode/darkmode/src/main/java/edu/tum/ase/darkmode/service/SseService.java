package edu.tum.ase.darkmode.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CopyOnWriteArraySet;

@Service
public class SseService {

    private final Set<SseEmitter> emitters = new CopyOnWriteArraySet<>();

    public SseEmitter connectToThemeSse() {
        SseEmitter emitter = new SseEmitter();
        emitters.add(emitter);
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        sendInitializationEvent(emitter);
        return emitter;
    }

    // This initialization event is sent as the first event just to establish connection at first
    // instead of making the connection pending
    public void sendInitializationEvent(SseEmitter emitter) {
        CompletableFuture.runAsync(() -> {
            try {
                // Simulate theme change event
                emitter.send(SseEmitter.event().name("connect").data("init"));
            } catch (IOException e) {
                // Handle errors or remove the emitter from the set
                emitters.remove(emitter);
                emitter.completeWithError(e);
            }
        });
    }

    public void sendThemeChangeEvent() {
        for (SseEmitter emitter : emitters) {
            CompletableFuture.runAsync(() -> {
                try {
                    // Simulate theme change event
                    emitter.send(SseEmitter.event().name("theme-change").data("change"));
                } catch (IOException e) {
                    // Handle errors or remove the emitter from the set
                    emitters.remove(emitter);
                    emitter.completeWithError(e);
                }
            });
        }
    }

}
