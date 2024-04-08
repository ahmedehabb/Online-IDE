package com.onlineide.apigateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.csrf.*;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.beans.factory.annotation.Value;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {

    @Value("${cors.origins}")
    private String loginPage;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // XorCsrfTokenRequestAttributeHandler delegate = new XorCsrfTokenRequestAttributeHandler();
        // delegate.setCsrfRequestAttributeName("_csrf");
        // CsrfTokenRequestHandler requestHandler = delegate::handle;
        return http.
                authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/api/**").authenticated();
                    auth.requestMatchers("/user").authenticated();
                    auth.anyRequest().permitAll();
                })
                .oauth2Login(oauth2Login ->
                        oauth2Login
                                .loginPage(loginPage)
                                .defaultSuccessUrl(loginPage + "/projects")
                                .permitAll()
                )
                .logout((logout) ->
                    logout.deleteCookies("JSESSIONID")
                    .invalidateHttpSession(true)
                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "POST"))
                    .permitAll()
                    .logoutSuccessHandler((new HttpStatusReturningLogoutSuccessHandler (HttpStatus.OK)))
                )
                .csrf(csrf -> {
                    csrf.disable();
                    // csrf.ignoringRequestMatchers("/login", "/logout");
                    // csrf.csrfTokenRepository(csrfTokenRepository());
                    // csrf.csrfTokenRequestHandler(requestHandler);
                })
                .build();
    }

    // @Bean
    // public CsrfTokenRepository csrfTokenRepository() {
    //     CookieCsrfTokenRepository repository = CookieCsrfTokenRepository.withHttpOnlyFalse();
    //     repository.setCookiePath("/");
    //     return repository;
    // }
}
