package com.onlineide.apigateway.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;


@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {

    @Value("${cors.origins}")
    private String corsOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] origins = corsOrigins.split(",");
        registry.addMapping("/**")
                .allowedHeaders("*", "x-csrf-token") // Allow 'x-csrf-token' header
                .allowedOrigins(corsOrigins)
                .allowedMethods("*")
                .allowCredentials(true);
    }

    @Bean
    public FilterRegistrationBean<CorsHeaderFilter> corsHeaderFilter() {
        FilterRegistrationBean<CorsHeaderFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new CorsHeaderFilter());
        registrationBean.addUrlPatterns("/*");
        return registrationBean;
    }

    public class CorsHeaderFilter implements Filter {

        @Override
        public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
                throws IOException, ServletException {
            HttpServletResponse httpServletResponse = (HttpServletResponse) response;
            HttpServletRequest httpServletRequest = (HttpServletRequest) request;

            httpServletResponse.setHeader("Access-Control-Allow-Origin", corsOrigins);

            // Preflight request. Reply successfully:
            if (httpServletRequest.getMethod().equals("OPTIONS")) {
                httpServletResponse.setStatus(HttpServletResponse.SC_OK);
                return;
            }

            chain.doFilter(request, response);
        }
    }
}
