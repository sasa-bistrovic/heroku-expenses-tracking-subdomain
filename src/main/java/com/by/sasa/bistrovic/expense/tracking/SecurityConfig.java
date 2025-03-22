package com.by.sasa.bistrovic.expense.tracking;
/*
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
*/
//@Configuration
public class SecurityConfig {
/*
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .requiresChannel(channel ->
                channel.requestMatchers(r -> 
                    !r.getHeader("Host").contains("localhost") &&
                    !r.getHeader("Host").contains("herokuapp"))
                .requiresSecure()
            );

        return http.build();
    }
*/    
}    
/*
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeRequests(authorizeRequests ->
                authorizeRequests
                    .anyRequest().permitAll() // Privremeno dopušta sve zahtjeve bez autentifikacije
            )
            .requiresChannel(channel ->
                channel.anyRequest().requiresInsecure() // Omogućuje HTTP za sve zahtjeve (nema potrebe za HTTPS-om na localhostu)
            )
            .csrf().disable(); // Isključuje CSRF zaštitu ako nije potrebna u testiranju

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web
            .httpFirewall(allowDoubleSlashes());
    }

    @Bean
    public HttpFirewall allowDoubleSlashes() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
        firewall.setAllowUrlEncodedDoubleSlash(true);  // Omogućuje rukovanje duplim kosim crtama u URL-ovima
        return firewall;
    }
}
*/