-- V5: Create resource_languages join table
CREATE TABLE resource_languages (
    resource_id BIGINT NOT NULL,
    language_id BIGINT NOT NULL,
    PRIMARY KEY (resource_id, language_id),
    CONSTRAINT fk_rl_resource FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
    CONSTRAINT fk_rl_language FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_rl_resource ON resource_languages(resource_id);
CREATE INDEX idx_rl_language ON resource_languages(language_id);
