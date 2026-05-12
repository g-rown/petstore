package com.petstore.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DataSourceConfig {

    @Bean
    @ConfigurationProperties("spring.datasource")
    public DataSourceProperties dataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    public DataSource dataSource(DataSourceProperties properties) {
        String url = properties.getUrl();
        if (url != null && (url.startsWith("postgres://") || url.startsWith("postgresql://"))) {
            URI uri = URI.create(url);
            String userInfo = uri.getUserInfo();
            if (userInfo != null) {
                String[] parts = userInfo.split(":", 2);
                if (parts.length > 0 && properties.getUsername() == null) {
                    properties.setUsername(parts[0]);
                }
                if (parts.length > 1 && properties.getPassword() == null) {
                    properties.setPassword(parts[1]);
                }
            }
            StringBuilder jdbcUrl = new StringBuilder("jdbc:postgresql://");
            jdbcUrl.append(uri.getHost());
            jdbcUrl.append(':');
            jdbcUrl.append(uri.getPort() == -1 ? 5432 : uri.getPort());
            jdbcUrl.append(uri.getPath());
            if (uri.getQuery() != null) {
                jdbcUrl.append('?').append(uri.getQuery());
            }
            properties.setUrl(jdbcUrl.toString());
        }
        return properties.initializeDataSourceBuilder()
                .type(HikariDataSource.class)
                .build();
    }
}
