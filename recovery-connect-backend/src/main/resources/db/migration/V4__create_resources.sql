-- V4: Create resources table (Main Table)
CREATE TABLE resources (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id BIGINT NOT NULL,
    phone VARCHAR(50),
    website VARCHAR(500),
    address TEXT,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    cost VARCHAR(100) NOT NULL DEFAULT 'Free',
    eligibility TEXT,
    availability VARCHAR(255),
    accessibility TEXT,
    source_url VARCHAR(500),
    verification_status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    verification_date DATETIME,
    last_updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_synthetic BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_resources_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    CONSTRAINT chk_verification_status CHECK (verification_status IN (
        'PENDING', 'SOURCE_CHECKED', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED', 'NEEDS_UPDATE', 'ARCHIVED'
    ))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Indexes for high-frequency queries
CREATE INDEX idx_resources_name ON resources(name);
CREATE INDEX idx_resources_category_id ON resources(category_id);
CREATE INDEX idx_resources_city ON resources(city);
CREATE INDEX idx_resources_cost ON resources(cost);
CREATE INDEX idx_resources_verification ON resources(verification_status);
CREATE INDEX idx_resources_is_active ON resources(is_active);
CREATE INDEX idx_resources_geo ON resources(latitude, longitude);
CREATE INDEX idx_resources_last_updated ON resources(last_updated);
CREATE INDEX idx_resources_composite_search ON resources(category_id, is_active, verification_status, city);
