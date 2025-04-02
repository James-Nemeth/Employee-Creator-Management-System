package nology.io.employee_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    public void addCorsMappings(@SuppressWarnings("null") CorsRegistry registry) {
        String[] allowedOrigins = {
                "http://localhost:5173/",
                "http://127.0.0.1:5173/",
                "http://employee-creator-ms.s3-website-ap-southeast-2.amazonaws.com",
                "http://3.27.171.213:8080",

        };
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("*")
                .allowedHeaders("*");
    }
}