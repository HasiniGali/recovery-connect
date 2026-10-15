-- V8: Create verification_history table (Append-Only Audit Trail)
CREATE TABLE verification_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resource_id BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL,
    source VARCHAR(255),
    notes TEXT,
    verified_by BIGINT NULL,
    verified_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_vh_resource FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
    CONSTRAINT fk_vh_verified_by FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL,

    CONSTRAINT chk_vh_status CHECK (status IN (
        'PENDING',
        'SOURCE_CHECKED',
        'UNDER_REVIEW',
        'VERIFIED',
        'REJECTED',
        'NEEDS_UPDATE',
        'ARCHIVED'
    ))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_vh_resource_id ON verification_history(resource_id);
CREATE INDEX idx_vh_verified_at ON verification_history(verified_at);
